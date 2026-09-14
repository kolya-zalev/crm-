import { test, expect } from "@playwright/test";

test.describe("Tasks", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/tasks");
    await expect(page.getByText("Total tasks:")).toBeVisible();
  });

  test("shows filter buttons", async ({ page }) => {
    await expect(page.getByRole("button", { name: "all" })).toBeVisible();
    await expect(page.getByRole("button", { name: "overdue" })).toBeVisible();
    await expect(page.getByRole("button", { name: "completed" })).toBeVisible();
    await expect(page.getByRole("button", { name: "high" })).toBeVisible();
  });

  test("switches filter to high", async ({ page }) => {
    await page.getByRole("button", { name: "high" }).click();
    await expect(page.getByText("Total tasks:")).toBeVisible();
  });
});
