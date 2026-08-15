import { NextRequest, NextResponse } from "next/server";
import { UMAMI_SEND_URL, UMAMI_WEBSITE_ID } from "@/lib/umami";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_768;

function clientIp(request: NextRequest): string | undefined {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip")?.trim();
  return ip || undefined;
}

export async function POST(request: NextRequest) {
  const raw = await request.arrayBuffer();
  if (raw.byteLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: "Payload too large" }, { status: 413 });
  }

  let body: { payload?: Record<string, unknown> };
  try {
    body = JSON.parse(new TextDecoder().decode(raw));
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (body.payload?.website !== UMAMI_WEBSITE_ID) {
    return NextResponse.json({ error: "Invalid website" }, { status: 400 });
  }

  const ip = clientIp(request);
  if (ip) {
    body.payload = { ...body.payload, ip };
  }

  const headers = new Headers({ "content-type": "application/json" });
  const userAgent = request.headers.get("user-agent");
  if (userAgent) {
    headers.set("user-agent", userAgent);
  }
  const cache = request.headers.get("x-umami-cache");
  if (cache) {
    headers.set("x-umami-cache", cache);
  }

  const upstream = await fetch(UMAMI_SEND_URL, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  return new NextResponse(upstream.body, {
    status: upstream.status,
    headers: {
      "content-type":
        upstream.headers.get("content-type") ?? "application/json",
      "cache-control": "no-store",
    },
  });
}
