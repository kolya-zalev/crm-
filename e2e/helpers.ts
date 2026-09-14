import { expect, type Page } from "@playwright/test";

export async function createLead(page: Page, name: string) {
  await page.getByRole("button", { name: "Add Lead" }).click();
  await page.getByPlaceholder("Name").fill(name);
  await page.getByPlaceholder("Email").fill(`${Date.now()}@e2e.test`);
  await page.getByPlaceholder("Phone").fill("1234567890");
  await page.getByPlaceholder("Company").fill("E2E Company");
  await page.getByRole("button", { name: "Create" }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.getByPlaceholder("Search").fill(name);
  await expect(
    page.locator("table tbody").getByText(name, { exact: true }),
  ).toBeVisible();
}
