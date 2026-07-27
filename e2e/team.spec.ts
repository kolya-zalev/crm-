import { test, expect } from "@playwright/test";

test.describe("Team", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/team");
  });

  test("loads team page", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Team" })).toBeVisible();
  });
  test("invites a user", async ({ page }) => {
    const email = `e2e-test-${Date.now()}@test.com`;
    await page.getByRole("button", { name: "Invite user" }).click();
    await page.getByRole("textbox", { name: "Email" }).fill(email);
    await page.getByRole("combobox", { name: "Role" }).selectOption("manager");
    await page.getByRole("button", { name: "Send invite" }).click();
    await expect(page.getByText("Invite sent successfully")).toBeVisible();
    await expect(page.getByText(email)).toBeVisible();
  });
  test("click button disabled", async ({ page }) => {
    const row = page.getByRole("row", { name: "testmember@example.com" });
    await row.getByRole("button", { name: "Disable" }).click();
    await expect(page.getByText("User disabled successfully")).toBeVisible();
    await expect(row.getByText("disabled")).toBeVisible();
  });
});
