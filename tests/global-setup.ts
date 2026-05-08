import { chromium, type FullConfig } from "@playwright/test";
import fs from "fs";
import path from "path";

const BASE = "http://localhost:3000";
const AUTH_FILE = path.join(__dirname, ".auth/state.json");

export default async function globalSetup(_config: FullConfig) {
  // Ensure the .auth directory exists
  const authDir = path.dirname(AUTH_FILE);
  if (!fs.existsSync(authDir)) fs.mkdirSync(authDir, { recursive: true });

  const browser = await chromium.launch();
  const context = await browser.newContext();
  // Give each navigation up to 120s — first Turbopack compilation can take 30-60s
  context.setDefaultNavigationTimeout(120000);
  context.setDefaultTimeout(120000);
  const page = await context.newPage();

  // Navigate to login page
  console.log("[setup] Navigating to login page (first compile may take 30-60s)…");
  await page.goto(`${BASE}/admin/login`, { timeout: 120000 });
  await page.waitForSelector("#password", { timeout: 30000 });

  // Fill credentials and submit
  await page.fill("#password", "admin123");
  await page.click('[type="submit"]');

  // Wait for full redirect to /admin after window.location.href
  await page.waitForURL(`${BASE}/admin`, { timeout: 30000 });

  // Warm up Next.js Turbopack compilation for all admin pages.
  // This is critical: without a prior navigation the dev server compiles lazily,
  // causing the first test that visits each page to time out (30-50s).
  const adminPages = [
    "/admin",
    "/admin/blog",
    "/admin/blog/new",
    "/admin/portfolio",
    "/admin/portfolio/new",
    "/admin/testimonials",
    "/admin/services",
  ];
  console.log("[setup] Warming up admin page compilations…");
  for (const adminPage of adminPages) {
    console.log(`[setup]  → ${adminPage}`);
    await page.goto(`${BASE}${adminPage}`, { timeout: 120000 });
    await page.waitForLoadState("domcontentloaded", { timeout: 60000 });
  }
  console.log("[setup] Warmup complete.");

  // Save the browser state (cookies + localStorage) to disk
  await context.storageState({ path: AUTH_FILE });

  await browser.close();
  console.log("[setup] Auth state saved to", AUTH_FILE);
}
