import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: false, // Admin tests share JSON state — run sequentially
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never", outputFolder: "tests/report" }]],
  globalSetup: "./tests/global-setup.ts",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    storageState: "tests/.auth/state.json",
  },
  projects: [
    {
      // Auth tests: need a clean browser context (no stored cookies)
      name: "auth",
      testMatch: "**/01-auth.spec.ts",
      use: { ...devices["Desktop Chrome"], storageState: { cookies: [], origins: [] } },
    },
    {
      // API + admin UI tests: use stored auth cookie
      name: "admin",
      testMatch: ["**/02-api.spec.ts", "**/03-*.spec.ts", "**/04-*.spec.ts", "**/05-*.spec.ts", "**/06-*.spec.ts"],
      use: { ...devices["Desktop Chrome"] },
    },
    {
      // Public pages: no auth needed
      name: "public",
      testMatch: "**/07-public-site.spec.ts",
      use: { ...devices["Desktop Chrome"], storageState: { cookies: [], origins: [] } },
    },
    {
      // Mobile responsiveness
      name: "mobile",
      testMatch: "**/08-mobile.spec.ts",
      use: { ...devices["iPhone 14"], storageState: { cookies: [], origins: [] } },
    },
  ],
});
