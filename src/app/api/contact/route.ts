import { NextRequest, NextResponse } from "next/server";
import { verifyVerificationToken } from "@/lib/contactCodeStore";
import { isGraphMailConfigured, sendGraphMail } from "@/lib/graphMail";

const CONTACT_INBOX =
  process.env.CONTACT_INBOX_EMAIL?.trim() || "hello@opsology.io";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  honeypot?: string;
  verificationCode?: string;
  verificationToken?: string;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (char) => map[char]);
}

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recentRequests = requests.filter(
    (time) => now - time < RATE_LIMIT_WINDOW
  );

  if (recentRequests.length >= MAX_REQUESTS) {
    return false;
  }

  recentRequests.push(now);
  rateLimitMap.set(ip, recentRequests);
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIP || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    console.log("[contact] POST received");
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      console.log("[contact] Rate limit exceeded, ip:", ip);
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();

    if (!body.name || !body.email || !body.subject || !body.message) {
      console.log("[contact] Missing required fields");
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    if (body.honeypot && body.honeypot.trim() !== "") {
      console.log("[contact] Honeypot filled, silent reject");
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const code =
      typeof body.verificationCode === "string"
        ? body.verificationCode.trim()
        : "";
    const token =
      typeof body.verificationToken === "string"
        ? body.verificationToken.trim()
        : "";
    if (!code || code.length !== 6 || !token) {
      console.log("[contact] Missing or invalid verification code/token");
      return NextResponse.json(
        {
          error:
            "Verification code and token are required. Please request a new code and enter the 6 digits sent to your email.",
        },
        { status: 400 }
      );
    }
    const payload = verifyVerificationToken(token);
    if (!payload) {
      console.log("[contact] Token invalid or expired");
      return NextResponse.json(
        {
          error:
            "Invalid or expired verification. Please request a new code.",
        },
        { status: 400 }
      );
    }
    const normalizedEmail = body.email.trim().toLowerCase();
    if (payload.email !== normalizedEmail || payload.code !== code) {
      console.log("[contact] Email or code mismatch");
      return NextResponse.json(
        {
          error:
            "Verification code does not match. Please enter the code from your email.",
        },
        { status: 400 }
      );
    }
    console.log("[contact] Verification passed for", normalizedEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    if (body.message.length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters long" },
        { status: 400 }
      );
    }

    if (body.message.length > 5000) {
      return NextResponse.json(
        { error: "Message must be less than 5000 characters" },
        { status: 400 }
      );
    }

    if (!isGraphMailConfigured()) {
      console.error("Graph mail credentials not configured");
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const escapedName = escapeHtml(body.name);
    const escapedEmail = escapeHtml(body.email);
    const escapedPhone = body.phone ? escapeHtml(body.phone) : "";
    const escapedSubject = escapeHtml(body.subject);
    const escapedMessage = escapeHtml(body.message);
    const urlEncodedEmail = encodeURIComponent(body.email);

    const subject = `opsology.io Web Form: ${escapedSubject}`;
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #ea580c;">opsology.io Contact Form Submission</h2>
        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Name:</strong> ${escapedName}</p>
          <p><strong>Email:</strong> <a href="mailto:${urlEncodedEmail}">${escapedEmail}</a></p>
          ${escapedPhone ? `<p><strong>Phone:</strong> ${escapedPhone}</p>` : ""}
          <p><strong>Subject:</strong> ${escapedSubject}</p>
        </div>
        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; color: #1f2937;">
          <h3 style="color: #ea580c; margin-top: 0;">Message:</h3>
          <p style="white-space: pre-wrap; line-height: 1.6;">${escapedMessage}</p>
        </div>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 20px 0;">
        <p style="color: #6b7280; font-size: 12px;">
          This message was sent from the contact form on opsology.io
        </p>
      </div>
    `;

    const textContent = `
opsology.io contact form submission

Name: ${body.name}
Email: ${body.email}
${body.phone ? `Phone: ${body.phone}` : ""}
Subject: ${body.subject}

Message:
${body.message}

---
This message was sent from the contact form on opsology.io
    `;

    console.log(
      "[contact] Sending email to",
      CONTACT_INBOX,
      "from Graph sender, replyTo:",
      body.email,
      "subject:",
      body.subject
    );
    try {
      await sendGraphMail({
        to: CONTACT_INBOX,
        subject,
        text: textContent,
        html: htmlContent,
        replyTo: body.email.trim(),
      });
      console.log("[contact] Email sent successfully");
    } catch (sendError) {
      console.error("[contact] sendMail failed:", sendError);
      return NextResponse.json(
        { error: "Failed to send message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for reaching out — we'll get back to you as soon as we can.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("[contact] Unexpected error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
