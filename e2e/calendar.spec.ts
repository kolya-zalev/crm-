import { test, expect } from "@playwright/test";

test.describe("Calendar", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/calendar");
    await expect(
      page.getByRole("main").getByText("Tasks", { exact: true }),
    ).toBeVisible();
  });

  test("shows today by default", async ({ page }) => {
    const today = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
    await expect(page.getByText(today)).toBeVisible();
  });
});
