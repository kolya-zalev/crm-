import { test, expect } from "@playwright/test";

test.describe("Profile", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/profile");
    await expect(page.locator("#profile-name")).not.toHaveValue("");
    await expect(page.locator("#profile-email")).not.toHaveValue("");
  });

  test("loads name, email and password cards", async ({ page }) => {
    for (const title of ["Name", "Email", "Password"]) {
      await expect(
        page.locator('[data-slot="card-title"]').filter({ hasText: title }),
      ).toBeVisible();
    }

    await expect(page.locator("#profile-current-password")).toHaveValue("");
    await expect(page.locator("#profile-new-password")).toHaveValue("");
    await expect(page.locator("#profile-confirm-password")).toHaveValue("");
    await expect(page.getByRole("button", { name: "Save" })).toHaveCount(3);
  });
  test("updates the name and restores it", async ({ page }) => {
    const nameInput = page.locator("#profile-name");
    const original = await nameInput.inputValue();
    const nextName = `E2E ${Date.now()}`;
    const save = page
      .locator("form")
      .filter({ has: nameInput })
      .getByRole("button", { name: "Save" });

    await nameInput.fill(nextName);
    await save.click();
    await expect(page.getByText("Name updated")).toBeVisible();
    await expect(nameInput).toHaveValue(nextName);

    await nameInput.fill(original);
    await save.click();
    await expect(nameInput).toHaveValue(original);
  });
});
