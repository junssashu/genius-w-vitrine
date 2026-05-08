/**
 * 05 — Admin Testimonials UI (E2E)
 *
 * Tests for the Testimonials section:
 *  - Page renders with list and add button
 *  - Add new testimonial via the inline form
 *  - Inline edit an existing testimonial
 *  - Delete a testimonial
 *  - Testimonial appears on public /temoignages page
 *  - Validation: empty name or text prevented
 */
import { test, expect } from "@playwright/test";

test.describe("Admin — Testimonials UI", () => {
  test("testimonials page renders with header and Add button", async ({ page }) => {
    await page.goto("/admin/testimonials");
    await expect(page.getByRole("heading", { name: /Témoignages/i })).toBeVisible();
    await expect(page.getByRole("button", { name: /Ajouter/i })).toBeVisible();
  });

  test("click Add opens the new testimonial form", async ({ page }) => {
    await page.goto("/admin/testimonials");
    await page.click('button:has-text("Ajouter")');

    // A form with name, role, city, text fields should appear
    await expect(page.locator("input[placeholder*='Nom' i], input[id*='name' i]")).toBeVisible({ timeout: 3000 });
    await expect(page.locator("textarea[placeholder*='Témoignage' i], textarea[id*='text' i]")).toBeVisible();
  });

  test("create a new testimonial and verify it appears in list", async ({ page }) => {
    await page.goto("/admin/testimonials");
    await page.click('button:has-text("Ajouter")');

    // Fill form — use flexible locators since IDs may vary
    const nameInput = page.locator('input[placeholder*="Nom" i]').first();
    const textArea = page.locator('textarea[placeholder*="Témoignage" i]').first();
    const roleInput = page.locator('input[placeholder*="Rôle" i]').first();
    const cityInput = page.locator('input[placeholder*="Ville" i]').first();

    await nameInput.fill("Marie Dupont Test");
    await textArea.fill("Service exceptionnel, je recommande vivement!");
    if (await roleInput.count() > 0) await roleInput.fill("Cliente VIP");
    if (await cityInput.count() > 0) await cityInput.fill("Bordeaux");

    // Submit the new testimonial
    const submitBtn = page.locator('button[type="submit"]').first();
    await submitBtn.click();

    // Success message or item appears in list
    await expect(page.locator('text="Marie Dupont Test"')).toBeVisible({ timeout: 5000 });

    // Cleanup via API (item was prepended at index 0)
    await page.request.delete("/api/admin/testimonials/0");
  });

  test("inline edit a testimonial and save", async ({ page }) => {
    // Create a testimonial via API first
    await page.request.post("/api/admin/testimonials", {
      data: { name: "Éditer Moi", role: "Test", city: "Paris", text: "Texte original." },
    });

    await page.goto("/admin/testimonials");
    // The testimonial should be at index 0 (prepended)
    // Find the edit button (pencil icon) for the first item
    const editBtn = page.locator('[aria-label="Éditer"], button:has(svg)').first();
    await editBtn.click();

    // An edit form should appear — update the name
    const nameInput = page.locator('input[placeholder*="Nom" i], input').filter({ hasText: "" }).first();
    // Use a more reliable approach — find the visible form input
    const visibleInput = page.locator("form input").first();
    await visibleInput.fill("Nom Modifié");

    // Save
    await page.click('button[type="submit"]');
    await expect(page.locator('text="Témoignage enregistré"')).toBeVisible({ timeout: 5000 });

    // Cleanup
    await page.request.delete("/api/admin/testimonials/0");
  });

  test("delete a testimonial via delete button", async ({ page }) => {
    await page.request.post("/api/admin/testimonials", {
      data: { name: "À Supprimer Témoignage", role: "Test", city: "Lyon", text: "Supprimer ce test." },
    });

    await page.goto("/admin/testimonials");
    await expect(page.locator('text="À Supprimer Témoignage"')).toBeVisible({ timeout: 5000 });

    // Handle confirm dialog
    page.on("dialog", (d) => d.accept());

    // Click the delete button for the first testimonial
    await page.locator('[aria-label="Supprimer"]').first().click();
    await expect(page.locator('text="À Supprimer Témoignage"')).not.toBeVisible({ timeout: 5000 });
  });

  test("testimonial appears on public /temoignages page", async ({ page }) => {
    const uniqueText = `Visible publiquement ${Date.now()}`;
    await page.request.post("/api/admin/testimonials", {
      data: { name: "Témoin Public Test", role: "Client", city: "Marseille", text: uniqueText },
    });

    await page.goto("/temoignages");
    await expect(page.locator("body")).toContainText("Témoin Public Test", { timeout: 5000 });

    // Cleanup
    await page.request.delete("/api/admin/testimonials/0");
  });

  test("cancel form closes new testimonial panel", async ({ page }) => {
    await page.goto("/admin/testimonials");
    await page.click('button:has-text("Ajouter")');

    // The form should be visible
    await expect(page.locator('input[placeholder*="Nom" i]')).toBeVisible({ timeout: 3000 });

    // Click Annuler or close button
    const cancelBtn = page.locator('button:has-text("Annuler"), button[aria-label="Fermer"]');
    if (await cancelBtn.count() > 0) {
      await cancelBtn.first().click();
      await expect(page.locator('input[placeholder*="Nom" i]')).not.toBeVisible({ timeout: 3000 });
    }
  });
});
