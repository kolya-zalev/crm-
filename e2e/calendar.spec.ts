import { test, expect } from "@playwright/test";

test.describe("Calendar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/calendar");
  });

  test("loads calendar page", async ({ page }) => {
    await expect(page.getByText("Tasks")).toBeVisible();
  });
});
