/**
 * 04 — Admin Portfolio UI (E2E)
 *
 * Full end-to-end tests for the Portfolio "looks" section:
 *  - Portfolio list page renders
 *  - Create a new look via the form
 *  - Edit an existing look's title/description
 *  - Delete a look via the trash button
 *  - Look appears on public /portfolio page after creation
 *  - Look disappears after deletion
 */
import { test, expect } from "@playwright/test";

const slug = () => `ui-look-${Date.now()}`;

test.describe("Admin — Portfolio UI", () => {
  test("portfolio list page renders with header and CTA", async ({ page }) => {
    await page.goto("/admin/portfolio");
    await expect(page.getByRole("heading", { name: /Portfolio|Looks/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /Nouveau look/i })).toBeVisible();
  });

  test("new look page renders required form fields", async ({ page }) => {
    await page.goto("/admin/portfolio/new");
    await expect(page.locator("#title")).toBeVisible();
    await expect(page.locator("#slug")).toBeVisible();
  });

  test("title field auto-generates slug for looks", async ({ page }) => {
    await page.goto("/admin/portfolio/new");
    await page.fill("#title", "Look Élégant Doré");
    await expect(page.locator("#slug")).toHaveValue("look-elegant-dore", { timeout: 3000 });
  });

  test("create a new look and verify it appears in the list", async ({ page }) => {
    const testSlug = slug();
    const testTitle = `Look Test ${testSlug}`;

    await page.goto("/admin/portfolio/new");
    await page.fill("#title", testTitle);
    await page.waitForTimeout(300);
    await page.fill("#slug", testSlug);

    // Fill optional fields if present
    const descField = page.locator("#description, textarea[placeholder*='description' i]");
    if (await descField.count() > 0) {
      await descField.first().fill("Description du look de test");
    }

    await page.click('[type="submit"]');
    await page.waitForURL("**/admin/portfolio", { timeout: 10000 });
    await expect(page.locator(`text="${testTitle}"`)).toBeVisible({ timeout: 5000 });

    // Cleanup
    await page.request.delete(`/api/admin/portfolio/${testSlug}`);
  });

  test("edit an existing look and save", async ({ page }) => {
    const testSlug = slug();
    await page.request.post("/api/admin/portfolio", {
      data: { slug: testSlug, title: "Look Avant Modif", category: "Couture", year: "SS 26", description: "Desc", palette: { from: "#000", to: "#111", accent: "#b8945f" }, motif: "weave" },
    });

    await page.goto(`/admin/portfolio/${testSlug}`);
    await expect(page.locator("#title")).toHaveValue("Look Avant Modif");

    await page.fill("#title", "Look Après Modif");
    await page.click('[type="submit"]');

    await page.waitForURL("**/admin/portfolio", { timeout: 10000 });
    await expect(page.locator('text="Look Après Modif"')).toBeVisible({ timeout: 5000 });

    // Cleanup
    await page.request.delete(`/api/admin/portfolio/${testSlug}`);
  });

  test("delete look via trash button in list", async ({ page }) => {
    const testSlug = slug();
    const testTitle = "Look À Supprimer";
    await page.request.post("/api/admin/portfolio", {
      data: { slug: testSlug, title: testTitle, category: "Test", year: "SS 26", description: "", palette: { from: "#000", to: "#111", accent: "#b8945f" }, motif: "weave" },
    });

    await page.goto("/admin/portfolio");
    await expect(page.locator(`text="${testTitle}"`)).toBeVisible({ timeout: 5000 });

    // Handle confirm dialog automatically
    page.on("dialog", (d) => d.accept());

    const row = page.locator("tr").filter({ hasText: testTitle });
    await row.locator('[aria-label="Supprimer"]').click();

    await expect(page.locator(`text="${testTitle}"`)).not.toBeVisible({ timeout: 5000 });
  });

  test("look appears on public /portfolio page", async ({ page }) => {
    const testSlug = slug();
    const testTitle = `Public Portfolio ${testSlug}`;
    await page.request.post("/api/admin/portfolio", {
      data: { slug: testSlug, title: testTitle, category: "Test", year: "SS 26", description: "Visible en public", palette: { from: "#0b0b0c", to: "#1a1a1c", accent: "#b8945f" }, motif: "weave" },
    });

    await page.goto("/portfolio");
    await expect(page.locator("body")).toContainText(testTitle, { timeout: 5000 });

    // Cleanup
    await page.request.delete(`/api/admin/portfolio/${testSlug}`);
  });

  test("new look form has back-link to portfolio list", async ({ page }) => {
    await page.goto("/admin/portfolio/new");
    await expect(page.locator("a:has-text('← Portfolio'), a:has-text('← Looks')")).toBeVisible();
  });

  test("unknown look slug returns 404 from API", async ({ page }) => {
    const res = await page.request.get("/api/admin/portfolio/this-does-not-exist-xyz-abc");
    expect(res.status()).toBe(404);
  });
});
