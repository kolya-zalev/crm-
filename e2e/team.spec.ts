import { test, expect } from "@playwright/test";

test.describe("Team", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/team");
    await expect(page.getByRole("heading", { name: "Team" })).toBeVisible();
  });

  test("loads team page", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Invite user" })).toBeVisible();
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

  test("disables an active team member", async ({ page }) => {
    const row = page.getByRole("row").filter({ hasText: "testmember@example.com" });
    const disableBtn = row.getByRole("button", { name: "Disable" });

    if (await disableBtn.isVisible()) {
      await disableBtn.click();
      await expect(page.getByText("User disabled successfully")).toBeVisible();
    }

    await expect(row.getByText("disabled")).toBeVisible();
  });

  test("cancel invite modal", async ({ page }) => {
    await page.getByRole("button", { name: "Invite user" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.getByRole("button", { name: "Cancel" }).click();
    await expect(page.getByRole("dialog")).not.toBeVisible();
  });

  test("Empty email invite", async ({ page }) => {
    await page.getByRole("button", { name: "Invite user" }).click();
    await page.getByRole("button", { name: "Send invite" }).click();
    await expect(page.getByText("Invalid email address")).toBeVisible();
  });
});
