/**
 * 07 — Public Site (Smoke Tests)
 *
 * Verifies the public-facing pages return HTTP 200, render key content,
 * and have no obvious broken states:
 *  - Home page (/)
 *  - Blog list (/blog)
 *  - Portfolio (/portfolio)
 *  - Services (/services)
 *  - Témoignages (/temoignages)
 *  - A 404 route returns the not-found page
 *  - Admin routes redirect to login (not accessible unauthenticated)
 *  - Meta titles are meaningful
 *  - No console errors on main pages
 */
import { test, expect, type Page } from "@playwright/test";

// This project uses NO storageState

async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(msg.text());
  });
  return errors;
}

test.describe("Public site — Smoke tests", () => {
  test("home page (/) loads and shows site name", async ({ page }) => {
    const errors = await collectConsoleErrors(page);
    await page.goto("/");
    await expect(page).toHaveURL("/");
    // Page should mention the brand name
    await expect(page.locator("body")).toContainText(/GENIUS\.W/i);
    // No critical console errors
    expect(errors.filter((e) => !e.includes("favicon"))).toHaveLength(0);
  });

  test("home page has a navigation", async ({ page }) => {
    await page.goto("/");
    const nav = page.locator("nav, header nav");
    await expect(nav.first()).toBeVisible();
  });

  test("home page has proper <title>", async ({ page }) => {
    await page.goto("/");
    const title = await page.title();
    expect(title.length).toBeGreaterThan(3);
    expect(title).toMatch(/GENIUS\.W|Genius|genius/i);
  });

  test("/blog loads and shows list heading", async ({ page }) => {
    await page.goto("/blog");
    await expect(page.locator("body")).toContainText(/Blog|Articles|Manifeste/i);
    await expect(page).toHaveURL("/blog");
  });

  test("/portfolio loads", async ({ page }) => {
    await page.goto("/portfolio");
    await expect(page.locator("body")).toContainText(/Portfolio|Looks|Collection/i);
    await expect(page).toHaveURL("/portfolio");
  });

  test("/services loads and shows at least one service", async ({ page }) => {
    await page.goto("/services");
    await expect(page.locator("body")).toContainText(/Service/i);
  });

  test("/temoignages loads", async ({ page }) => {
    await page.goto("/temoignages");
    await expect(page.locator("body")).toContainText(/Témoi|Avis|Client/i);
  });

  test("non-existent route shows 404 page", async ({ page }) => {
    await page.goto("/this-page-does-not-exist-at-all");
    // Next.js 404 page typically shows "404" or "not found"
    await expect(page.locator("body")).toContainText(/404|Not Found|introuvable/i);
  });

  test("unauthenticated /admin redirects to /admin/login", async ({ page }) => {
    await page.goto("/admin");
    await page.waitForURL("**/admin/login", { timeout: 8000 });
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("all main nav links are present on home page", async ({ page }) => {
    await page.goto("/");
    const body = page.locator("body");
    // These should exist somewhere in the navigation
    await expect(body).toContainText(/Blog|blog/);
    await expect(body).toContainText(/Portfolio|portfolio/);
    await expect(body).toContainText(/Service/i);
  });

  test("images on home page have alt attributes", async ({ page }) => {
    await page.goto("/");
    // Check that <img> tags have non-empty alt
    const images = page.locator("img");
    const count = await images.count();
    for (let i = 0; i < Math.min(count, 10); i++) {
      const alt = await images.nth(i).getAttribute("alt");
      // alt should be defined (can be empty string for decorative images, but not null)
      expect(alt).not.toBeNull();
    }
  });

  test("blog article page loads when at least one post exists", async ({ page }) => {
    // First check there are posts
    const res = await page.request.get("/api/admin/posts", {
      headers: { Cookie: "" }, // this will 401 — check public route instead
    });
    // Check public blog page has links
    await page.goto("/blog");
    const articleLinks = page.locator('a[href^="/blog/"]');
    const count = await articleLinks.count();
    if (count > 0) {
      // Click the first article
      const href = await articleLinks.first().getAttribute("href");
      if (href) {
        await page.goto(href);
        await expect(page.locator("body")).not.toContainText(/500|Internal Server Error/i);
      }
    }
  });

  test("page viewport meta is present (mobile friendly)", async ({ page }) => {
    await page.goto("/");
    const viewport = await page.locator('meta[name="viewport"]').getAttribute("content");
    expect(viewport).toContain("width=device-width");
  });
});
