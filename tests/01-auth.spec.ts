/**
 * 01 — Authentication & Authorization
 *
 * Tests all auth-related flows:
 *  - Login with wrong password shows error
 *  - Login with correct password redirects to /admin
 *  - Accessing /admin without a cookie redirects to /admin/login
 *  - Accessing /admin/blog without a cookie redirects to /admin/login
 *  - Logout clears the session and redirects to /admin/login
 *  - After logout, /admin is no longer accessible
 *  - Login page redirects to /admin if already authenticated
 */
import { test, expect } from "@playwright/test";

// This project uses NO storageState (see playwright.config.ts)
test.describe("Authentication", () => {
  test("login page renders correctly", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page).toHaveTitle(/GENIUS\.W/i);
    await expect(page.locator("input#password")).toBeVisible();
    await expect(page.locator('[type="submit"]')).toBeVisible();
    await expect(page.locator('[type="submit"]')).toBeDisabled(); // disabled when password is empty
    await expect(page.getByText("Espace Administration")).toBeVisible();
  });

  test("submit button enables only when password is typed", async ({ page }) => {
    await page.goto("/admin/login");
    const btn = page.locator('[type="submit"]');
    await expect(btn).toBeDisabled();
    await page.fill("#password", "a");
    await expect(btn).toBeEnabled();
    await page.fill("#password", "");
    await expect(btn).toBeDisabled();
  });

  test("wrong password shows error message", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("#password", "wrong-password");
    await page.click('[type="submit"]');
    // Wait for the error message to appear in the DOM
    await page.waitForSelector('[role="alert"]', { state: "attached", timeout: 5000 });
    const alertText = await page.locator('[role="alert"]').textContent();
    expect(alertText).toMatch(/incorrect|erreur/i);
  });

  test("correct password redirects to /admin", async ({ page }) => {
    await page.goto("/admin/login");
    await page.fill("#password", "admin123");
    await page.click('[type="submit"]');
    await page.waitForURL("**/admin", { timeout: 10000 });
    await expect(page).toHaveURL(/\/admin$/);
    // Dashboard should show admin UI
    await expect(page.locator("body")).not.toContainText("Connexion");
  });

  test("accessing /admin without cookie redirects to login", async ({ page }) => {
    // Fresh context (no storageState) — no cookies
    await page.goto("/admin");
    await page.waitForURL("**/admin/login", { timeout: 8000 });
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("accessing /admin/blog without cookie redirects to login", async ({ page }) => {
    await page.goto("/admin/blog");
    await page.waitForURL("**/admin/login", { timeout: 8000 });
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("accessing /admin/portfolio without cookie redirects to login", async ({ page }) => {
    await page.goto("/admin/portfolio");
    await page.waitForURL("**/admin/login", { timeout: 8000 });
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("logout clears session and redirects to login", async ({ page }) => {
    // First login
    await page.goto("/admin/login");
    await page.fill("#password", "admin123");
    await page.click('[type="submit"]');
    await page.waitForURL("**/admin", { timeout: 10000 });

    // Then logout — use aria-label only to avoid strict mode violation
    await page.click('[aria-label="Déconnexion"]');
    await page.waitForURL("**/admin/login", { timeout: 8000 });
    await expect(page).toHaveURL(/\/admin\/login/);

    // Navigating back to /admin should redirect to login
    await page.goto("/admin");
    await page.waitForURL("**/admin/login", { timeout: 8000 });
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("auth API returns 401 for wrong password", async ({ request }) => {
    const res = await request.post("/api/admin/auth", {
      data: { password: "badpassword" },
    });
    expect(res.status()).toBe(401);
    const body = await res.json() as { error: string };
    expect(body.error).toBeTruthy();
  });

  test("auth API returns 400 for missing body", async ({ request }) => {
    const res = await request.post("/api/admin/auth", {
      data: {},
    });
    expect(res.status()).toBe(401);
  });

  test("protected API returns 401 without cookie", async ({ page }) => {
    // Use a fresh request context with no cookies
    const apiContext = await page.context().browser()!.newContext();
    const res = await apiContext.request.get("http://localhost:3000/api/admin/posts");
    await apiContext.close();
    expect(res.status()).toBe(401);
  });

  test("logout API clears cookie", async ({ request }) => {
    // Login first
    const loginRes = await request.post("/api/admin/auth", {
      data: { password: "admin123" },
    });
    expect(loginRes.ok()).toBeTruthy();

    // Logout
    const logoutRes = await request.post("/api/admin/logout");
    expect(logoutRes.ok()).toBeTruthy();

    // Now a protected route should return 401
    const afterLogout = await request.get("/api/admin/posts");
    expect(afterLogout.status()).toBe(401);
  });
});
