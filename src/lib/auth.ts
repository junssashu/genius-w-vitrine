export const ADMIN_COOKIE = "gw-admin";
export const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

async function hmacSha256(message: string, secret: string): Promise<string> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(message));
  return btoa(String.fromCharCode(...new Uint8Array(sig)));
}

export async function createAdminToken(): Promise<string> {
  const secret = process.env.ADMIN_PASSWORD ?? "";
  const exp = Date.now() + COOKIE_MAX_AGE * 1000;
  const payload = btoa(JSON.stringify({ exp }));
  const sig = await hmacSha256(payload, secret);
  return `${payload}.${sig}`;
}

export async function verifyAdminToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) return false;
  try {
    const dotIdx = token.lastIndexOf(".");
    if (dotIdx === -1) return false;
    const payload = token.slice(0, dotIdx);
    const sig = token.slice(dotIdx + 1);
    const { exp } = JSON.parse(atob(payload)) as { exp: number };
    if (Date.now() > exp) return false;
    const expected = await hmacSha256(payload, secret);
    return sig === expected;
  } catch {
    return false;
  }
}
