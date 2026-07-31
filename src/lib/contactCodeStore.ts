/**
 * Contact form verification: signed token instead of in-memory store
 * so verification works across serverless instances (e.g. Vercel).
 * Token contains { email, code, exp }; signed with CONTACT_VERIFY_SECRET.
 */
import crypto from "crypto";

const CODE_TTL_MS = 10 * 60 * 1000; // 10 minutes

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function base64UrlEncode(buf: Buffer): string {
  return buf
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function base64UrlDecode(str: string): Buffer {
  let b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const pad = b64.length % 4;
  if (pad) b64 += "=".repeat(4 - pad);
  return Buffer.from(b64, "base64");
}

function getSecret(): string {
  const secret = process.env.CONTACT_VERIFY_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error(
      "CONTACT_VERIFY_SECRET must be set and at least 16 characters"
    );
  }
  return secret;
}

export interface VerificationPayload {
  email: string;
  code: string;
  exp: number;
}

export function createVerificationToken(email: string, code: string): string {
  const normalized = normalizeEmail(email);
  const payload: VerificationPayload = {
    email: normalized,
    code: code.trim(),
    exp: Date.now() + CODE_TTL_MS,
  };
  const payloadB64 = base64UrlEncode(
    Buffer.from(JSON.stringify(payload), "utf8")
  );
  const sig = crypto.createHmac("sha256", getSecret()).update(payloadB64).digest();
  const sigB64 = base64UrlEncode(sig);
  return `${payloadB64}.${sigB64}`;
}

export function verifyVerificationToken(
  token: string
): VerificationPayload | null {
  try {
    const [payloadB64, sigB64] = token.split(".");
    if (!payloadB64 || !sigB64) return null;
    const expectedSig = crypto
      .createHmac("sha256", getSecret())
      .update(payloadB64)
      .digest();
    const sig = base64UrlDecode(sigB64);
    if (
      sig.length !== expectedSig.length ||
      !crypto.timingSafeEqual(sig, expectedSig)
    ) {
      return null;
    }
    const payloadJson = base64UrlDecode(payloadB64).toString("utf8");
    const payload = JSON.parse(payloadJson) as VerificationPayload;
    if (Date.now() > payload.exp) return null;
    if (!payload.email || !payload.code) return null;
    return payload;
  } catch {
    return null;
  }
}

export function generateSixDigitCode(): string {
  const n = Math.floor(Math.random() * 1_000_000);
  return n.toString().padStart(6, "0");
}
