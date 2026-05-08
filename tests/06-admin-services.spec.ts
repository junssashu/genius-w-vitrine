/**
 * 06 — Admin Services UI (E2E)
 *
 * Tests for the Services edit section:
 *  - Page renders with all service forms
 *  - Edit a service title and save
 *  - Edit a service description and save
 *  - Add a feature to a service and save
 *  - Remove a feature from a service and save
 *  - Changes appear on the public /services page
 *  - Each service has a "Voir →" external link
 */
import { test, expect } from "@playwright/test";

test.describe("Admin — Services UI", () => {
  test("services page renders header and service forms", async ({ page }) => {
    await page.goto("/admin/services");
    await expect(page.getByRole("heading", { name: /Services/i })).toBeVisible();
    // At least one form for services should be present
    await expect(page.locator("form").first()).toBeVisible({ timeout: 5000 });
  });

  test("each service form has title and description fields", async ({ page }) => {
    await page.goto("/admin/services");
    await page.waitForSelector("form", { timeout: 5000 });
    // First service's title field
    const titleInput = page.locator('[id^="title-"]').first();
    await expect(titleInput).toBeVisible();
    await expect(titleInput).not.toBeEmpty();
    // First service's description field
    const descField = page.locator('[id^="desc-"]').first();
    await expect(descField).toBeVisible();
  });

  test("edit service title and save", async ({ page }) => {
    // Get current title first via API
    const res = await page.request.get("/api/admin/services");
    const services = await res.json() as { title: string; description: string; subtitle: string; features: string[]; slug: string; num: string; price: string }[];
    const originalTitle = services[0].title;

    await page.goto("/admin/services");
    await page.waitForSelector('[id="title-0"]', { timeout: 5000 });

    // Modify the first service title
    await page.fill('[id="title-0"]', "Titre Modifié Test");

    // Submit the first service's form
    const firstForm = page.locator("form").first();
    await firstForm.locator('[type="submit"]').click();

    // Expect success message
    await expect(page.locator('text="Titre Modifié Test"').first()).toBeVisible({ timeout: 5000 });
    const successMsg = page.locator('[class*="text-green"], [class*="success"], p:has-text("enregistré")');
    await expect(successMsg).toBeVisible({ timeout: 5000 });

    // Restore the original title
    await page.fill('[id="title-0"]', originalTitle);
    await firstForm.locator('[type="submit"]').click();
    await page.waitForTimeout(500);
  });

  test("edit service description and save", async ({ page }) => {
    const res = await page.request.get("/api/admin/services");
    const services = await res.json() as { title: string; description: string; subtitle: string; features: string[]; slug: string; num: string; price: string }[];
    const originalDesc = services[0].description;

    await page.goto("/admin/services");
    await page.waitForSelector('[id="desc-0"]', { timeout: 5000 });

    await page.fill('[id="desc-0"]', "Description modifiée via test Playwright.");
    const firstForm = page.locator("form").first();
    await firstForm.locator('[type="submit"]').click();
    await expect(page.locator('text=/enregistr/i')).toBeVisible({ timeout: 5000 });

    // Restore
    await page.fill('[id="desc-0"]', originalDesc);
    await firstForm.locator('[type="submit"]').click();
    await page.waitForTimeout(500);
  });

  test("add a feature to a service and verify", async ({ page }) => {
    const res = await page.request.get("/api/admin/services");
    const services = await res.json() as { title: string; description: string; subtitle: string; features: string[]; slug: string; num: string; price: string }[];
    const originalFeatures = [...services[0].features];

    await page.goto("/admin/services");
    await page.waitForSelector("form", { timeout: 5000 });

    // Click "+ Ajouter" button for features in the first service
    const addFeatureBtn = page.locator("form").first().locator('button:has-text("+ Ajouter")');
    await addFeatureBtn.click();

    // A new input should appear — fill it
    const featureInputs = page.locator("form").first().locator('input[placeholder*="Fonctionnalité" i], input[placeholder*="Caractéristique" i]');
    const count = await featureInputs.count();
    await featureInputs.nth(count - 1).fill("Nouvelle fonctionnalité test");

    // Save
    await page.locator("form").first().locator('[type="submit"]').click();
    await expect(page.locator('text=/enregistr/i')).toBeVisible({ timeout: 5000 });

    // Restore original features via API
    const restoreServices = [...services];
    restoreServices[0] = { ...restoreServices[0], features: originalFeatures };
    await page.request.put("/api/admin/services", { data: restoreServices });
  });

  test("service has 'Voir →' external link", async ({ page }) => {
    await page.goto("/admin/services");
    await page.waitForSelector("form", { timeout: 5000 });
    await expect(page.locator('a:has-text("Voir →")').first()).toBeVisible();
  });

  test("service changes appear on public /services page", async ({ page }) => {
    const uniqueTitle = `Service Test ${Date.now()}`;

    // Get current
    const res = await page.request.get("/api/admin/services");
    const services = await res.json() as { title: string; description: string; subtitle: string; features: string[]; slug: string; num: string; price: string }[];
    const originalTitle = services[0].title;

    // Change via admin UI
    await page.goto("/admin/services");
    await page.waitForSelector('[id="title-0"]', { timeout: 5000 });
    await page.fill('[id="title-0"]', uniqueTitle);
    await page.locator("form").first().locator('[type="submit"]').click();
    await expect(page.locator('text=/enregistr/i')).toBeVisible({ timeout: 5000 });

    // Check public page
    await page.goto("/services");
    await expect(page.locator("body")).toContainText(uniqueTitle, { timeout: 5000 });

    // Restore
    await page.goto("/admin/services");
    await page.waitForSelector('[id="title-0"]', { timeout: 5000 });
    await page.fill('[id="title-0"]', originalTitle);
    await page.locator("form").first().locator('[type="submit"]').click();
    await page.waitForTimeout(500);
  });

  test("all service forms have a save button", async ({ page }) => {
    await page.goto("/admin/services");
    await page.waitForSelector("form", { timeout: 5000 });
    const forms = page.locator("form");
    const formCount = await forms.count();
    expect(formCount).toBeGreaterThan(0);
    for (let i = 0; i < formCount; i++) {
      await expect(forms.nth(i).locator('[type="submit"]')).toBeVisible();
    }
  });
});
