import { NextRequest, NextResponse } from "next/server";
import {
  generateSixDigitCode,
  createVerificationToken,
} from "@/lib/contactCodeStore";
import { isGraphMailConfigured, sendGraphMail } from "@/lib/graphMail";

// Rate limit: max 5 code requests per IP per 15 min
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_CODE_REQUESTS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const requests = rateLimitMap.get(ip) || [];
  const recent = requests.filter((t) => now - t < RATE_LIMIT_WINDOW);
  if (recent.length >= MAX_CODE_REQUESTS) return false;
  recent.push(now);
  rateLimitMap.set(ip, recent);
  return true;
}

function getClientIP(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIP = request.headers.get("x-real-ip");
  return forwarded?.split(",")[0]?.trim() || realIP || "unknown";
}

export async function POST(request: NextRequest) {
  try {
    console.log("[send-code] POST received");
    const ip = getClientIP(request);
    if (!checkRateLimit(ip)) {
      console.log("[send-code] Rate limit exceeded");
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();
    const email = typeof body.email === "string" ? body.email.trim() : "";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      console.log("[send-code] Invalid or missing email");
      return NextResponse.json(
        { error: "Valid email is required" },
        { status: 400 }
      );
    }
    console.log("[send-code] Sending verification code to", email);

    if (!isGraphMailConfigured()) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const code = generateSixDigitCode();
    const token = createVerificationToken(email, code);

    const text = [
      "Opsology — email verification",
      "",
      "You requested to send a message via the contact form on opsology.io.",
      "Use the verification code below to confirm your email address and complete your message.",
      "",
      `Verification code: ${code}`,
      "",
      "This code expires in 10 minutes.",
      "",
      "If you did not request this code, you can safely ignore this email. No message will be sent from the contact form without this verification step.",
      "",
      "—",
      "Opsology",
      "Independent Infrastructure Assurance",
      "https://opsology.io",
    ].join("\n");

    const html = `
      <div style="font-family: Arial, Helvetica, sans-serif; max-width: 560px; margin: 0 auto; color: #1f2937; line-height: 1.55;">
        <p style="margin: 0 0 4px; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #6b7280;">Opsology</p>
        <h1 style="margin: 0 0 16px; font-size: 22px; color: #0f172a;">Verify your email</h1>
        <p style="margin: 0 0 12px;">
          You requested to send a message via the contact form on
          <a href="https://opsology.io" style="color: #ea580c;">opsology.io</a>.
          Enter the code below to confirm your email address and complete your message.
        </p>
        <div style="margin: 24px 0; padding: 20px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; text-align: center;">
          <p style="margin: 0 0 8px; font-size: 13px; color: #64748b;">Your verification code</p>
          <p style="margin: 0; font-size: 32px; letter-spacing: 0.28em; font-weight: 700; color: #0f172a;">${code}</p>
        </div>
        <p style="margin: 0 0 12px; color: #475569;">This code expires in <strong>10 minutes</strong>.</p>
        <p style="margin: 0 0 20px; color: #64748b; font-size: 14px;">
          If you did not request this code, you can safely ignore this email.
          No message will be sent from the contact form without this verification step.
        </p>
        <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
        <p style="margin: 0; font-size: 12px; color: #9ca3af;">
          Opsology · Independent Infrastructure Assurance<br />
          <a href="https://opsology.io" style="color: #9ca3af;">opsology.io</a>
        </p>
      </div>
    `;

    await sendGraphMail({
      to: email,
      subject: "Your opsology.io verification code",
      text,
      html,
    });
    console.log("[send-code] Verification code email sent successfully");

    return NextResponse.json({ success: true, token }, { status: 200 });
  } catch (error) {
    console.error("[send-code] Error sending verification code:", error);
    return NextResponse.json(
      { error: "Failed to send verification code. Please try again." },
      { status: 500 }
    );
  }
}
