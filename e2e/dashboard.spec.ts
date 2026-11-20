import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
    await expect(
      page
        .locator('[data-slot="card-title"]')
        .filter({ hasText: "Total Leads" }),
    ).toBeVisible();
  });

  test("shows stat cards", async ({ page }) => {
    for (const title of ["Total Leads", "New", "Won", "Lost"]) {
      await expect(
        page.locator('[data-slot="card-title"]').filter({ hasText: title }),
      ).toBeVisible();
    }
  });

  test("shows other sections", async ({ page }) => {
    await expect(page.getByText("Leads by Status")).toBeVisible();
    await expect(page.getByText("Recent Leads")).toBeVisible();
    await expect(page.getByText("Welcome back!")).toBeVisible();
  });
  test("click go to leads button", async ({ page }) => {
    await page.getByRole("link", { name: "Go to leads" }).click();
    await expect(page).toHaveURL(/\/lead$/);
    await expect(page.getByRole("button", { name: "Add Lead" })).toBeVisible();
  });
});
