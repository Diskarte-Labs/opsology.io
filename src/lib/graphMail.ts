/**
 * Send mail via Microsoft Graph (client credentials + Mail.Send application permission).
 *
 * Required env:
 *   GRAPH_TENANT_ID
 *   GRAPH_CLIENT_ID
 *   GRAPH_CLIENT_SECRET
 *   GRAPH_SENDER_EMAIL  — mailbox UPN the app sends as (e.g. hello@opsology.io)
 */

export type GraphMailMessage = {
  to: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
};

function requireEnv(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) {
    throw new Error(`${name} is not configured`);
  }
  return value;
}

let cachedToken: { accessToken: string; expiresAt: number } | null = null;

async function getAccessToken(): Promise<string> {
  const now = Date.now();
  if (cachedToken && cachedToken.expiresAt > now + 60_000) {
    return cachedToken.accessToken;
  }

  const tenantId = requireEnv("GRAPH_TENANT_ID");
  const clientId = requireEnv("GRAPH_CLIENT_ID");
  const clientSecret = requireEnv("GRAPH_CLIENT_SECRET");

  const response = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  const data = (await response.json()) as {
    access_token?: string;
    expires_in?: number;
    error?: string;
    error_description?: string;
  };

  if (!response.ok || !data.access_token) {
    throw new Error(
      data.error_description ||
        data.error ||
        `Failed to acquire Graph token (HTTP ${response.status})`
    );
  }

  const expiresInSec = data.expires_in ?? 3600;
  cachedToken = {
    accessToken: data.access_token,
    expiresAt: now + expiresInSec * 1000,
  };
  return data.access_token;
}

export function isGraphMailConfigured(): boolean {
  return Boolean(
    process.env.GRAPH_TENANT_ID?.trim() &&
      process.env.GRAPH_CLIENT_ID?.trim() &&
      process.env.GRAPH_CLIENT_SECRET?.trim() &&
      process.env.GRAPH_SENDER_EMAIL?.trim()
  );
}

export async function sendGraphMail(message: GraphMailMessage): Promise<void> {
  const sender = requireEnv("GRAPH_SENDER_EMAIL");
  const token = await getAccessToken();

  const graphMessage: Record<string, unknown> = {
    subject: message.subject,
    body: {
      contentType: "HTML",
      content: message.html || message.text.replace(/\n/g, "<br>"),
    },
    toRecipients: [
      {
        emailAddress: { address: message.to },
      },
    ],
  };

  if (message.replyTo) {
    graphMessage.replyTo = [
      {
        emailAddress: { address: message.replyTo },
      },
    ];
  }

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(sender)}/sendMail`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: graphMessage,
        saveToSentItems: true,
      }),
    }
  );

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Graph sendMail failed (HTTP ${response.status}): ${errorBody}`
    );
  }
}
