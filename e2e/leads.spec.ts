import { test, expect } from "@playwright/test";
import { createLead } from "./helpers";

test.describe("Leads", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/lead");
    await expect(page.getByRole("button", { name: "Add Lead" })).toBeVisible();
  });

  test("create a new lead", async ({ page }) => {
    const name = `E2E Lead ${Date.now()}`;
    await createLead(page, name);
  });

  test("search for a lead", async ({ page }) => {
    const name = `Search Lead ${Date.now()}`;
    await createLead(page, name);

    await page.getByPlaceholder("Search").fill(name);
    await expect(page.getByText(name)).toBeVisible();
  });

  test("filters leads by status", async ({ page }) => {
    await page.getByRole("combobox").first().click();
    await page.getByRole("option", { name: "Won" }).click();
    await expect(
      page.locator("table tbody").getByText("Mark", { exact: true }),
    ).toBeVisible();
  });

  test("navigates back from lead detail", async ({ page }) => {
    const row = page.getByRole("row").filter({ hasText: "John" });
    await row.getByRole("link").click();
    await page.getByText("← Back to Leads").click();
    await expect(page).toHaveURL(/\/lead$/);
    await expect(page.getByRole("button", { name: "Add Lead" })).toBeVisible();
  });

  test("shows validation errors on empty create", async ({ page }) => {
    await page.getByRole("button", { name: "Add Lead" }).click();
    await page.getByRole("button", { name: "Create" }).click();
    await expect(page.getByText("Name is required")).toBeVisible();
    await expect(page.getByText("Invalid email address")).toBeVisible();
    await expect(page.getByText("Phone is too short")).toBeVisible();
    await expect(
      page.getByRole("dialog").getByText("Enter company").first(),
    ).toBeVisible();
    await expect(page.getByText("Add New Lead")).toBeVisible();
  });

  test("Search no results", async ({ page }) => {
    await page.getByPlaceholder("Search").fill("Noleadshere:)");
    await expect(page.getByText("No leads found")).toBeVisible();
  });
});
