import { test, expect } from "@playwright/test";

test.describe("Leads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lead");
  });
  test("create a new lead", async ({ page }) => {
    await page.getByRole("button", { name: "Add Lead" }).click();
    await page.getByRole("textbox", { name: "Name" }).fill("Test Lead");
    await page.getByRole("textbox", { name: "Email" }).fill("test@example.com");
    await page.getByRole("textbox", { name: "Phone" }).fill("1234567890");
    await page.getByRole("textbox", { name: "Company" }).fill("Test Company");
    await page.getByRole("textbox", { name: "Notes" }).fill("Test Notes");
    await page.getByRole("textbox", { name: "Source" }).fill("Test Source");
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("Test Lead")).toBeVisible();
  });
  test("search for a lead", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).fill("Test Lead");
    await expect(page.getByText("Test Lead")).toBeVisible();
  });
});
