import type { APIRequestContext } from "@playwright/test";

export const BASE = "http://localhost:3000";
export const PASSWORD = "admin123";

/** Login via API and return the session cookie string */
export async function getAuthCookie(request: APIRequestContext): Promise<string> {
  const res = await request.post(`${BASE}/api/admin/auth`, {
    data: { password: PASSWORD },
  });
  if (!res.ok()) throw new Error(`Login failed: ${res.status()} ${await res.text()}`);
  const headers = res.headers();
  const raw = headers["set-cookie"] ?? "";
  // Extract gw-admin=<value>
  const match = raw.match(/gw-admin=([^;]+)/);
  if (!match) throw new Error("No auth cookie in response");
  return match[1];
}

/** Returns fetch headers with the auth cookie */
export async function authHeaders(request: APIRequestContext) {
  const cookie = await getAuthCookie(request);
  return { Cookie: `gw-admin=${cookie}` };
}

/** Unique test slug based on timestamp */
export function testSlug(prefix: string) {
  return `${prefix}-test-${Date.now()}`;
}
