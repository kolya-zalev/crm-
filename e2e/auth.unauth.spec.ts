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
  test("redirects from chat to login", async ({ page }) => {
    await page.goto("/chat");
    await expect(page).toHaveURL(/login/);
  });

  test("redirects from calendar to login", async ({ page }) => {
    await page.goto("/calendar");
    await expect(page).toHaveURL(/login/);
  });

  test("redirects from lead to login", async ({ page }) => {
    await page.goto("/lead");
    await expect(page).toHaveURL(/login/);
  });

  test("redirects from tasks to login", async ({ page }) => {
    await page.goto("/tasks");
    await expect(page).toHaveURL(/login/);
  });
});
