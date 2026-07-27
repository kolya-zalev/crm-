import { test, expect } from "@playwright/test";

test.describe("Auth redirects", () => {
  test("redirects from dashboard to login", async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/login/);
  });

  test("redirects from team to login", async ({ page }) => {
    await page.goto("/team");
    await expect(page).toHaveURL(/login/);
  });
});
