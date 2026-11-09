// Session helpers shared by middleware (Edge) and route handlers (Node).
// Uses Web Crypto only, so it works in both runtimes.
//
// Required environment variables (see .env.local.example):
//   ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_SESSION_SECRET

export const ADMIN_COOKIE = "pt_admin_session";
export const SESSION_SECONDS = 60 * 60 * 24 * 7; // 7 days

const encoder = new TextEncoder();

async function hmac(message: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function getSecret(): string | null {
  const secret = process.env.ADMIN_SESSION_SECRET;
  return secret && secret.length >= 16 ? secret : null;
}

export function isAuthConfigured(): boolean {
  return Boolean(process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD && getSecret());
}

export async function verifyCredentials(email: string, password: string): Promise<boolean> {
  const secret = getSecret();
  const expectedEmail = process.env.ADMIN_EMAIL;
  const expectedPassword = process.env.ADMIN_PASSWORD;
  if (!secret || !expectedEmail || !expectedPassword) return false;

  // Compare HMAC digests so the comparison time doesn't leak anything.
  const [a, b, c, d] = await Promise.all([
    hmac(email.trim().toLowerCase(), secret),
    hmac(expectedEmail.trim().toLowerCase(), secret),
    hmac(password, secret),
    hmac(expectedPassword, secret),
  ]);
  const emailOk = safeEqual(a, b);
  const passwordOk = safeEqual(c, d);
  return emailOk && passwordOk;
}

export async function createSessionToken(): Promise<string> {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET is not set (min 16 characters).");
  const expires = Date.now() + SESSION_SECONDS * 1000;
  const signature = await hmac(`admin|${expires}`, secret);
  return `${expires}.${signature}`;
}

export async function verifySessionToken(token: string | undefined): Promise<boolean> {
  const secret = getSecret();
  if (!token || !secret) return false;
  const [expiresRaw, signature] = token.split(".");
  const expires = Number(expiresRaw);
  if (!signature || !Number.isFinite(expires) || expires < Date.now()) return false;
  const expected = await hmac(`admin|${expires}`, secret);
  return safeEqual(signature, expected);
}
