import { test, expect } from "@playwright/test";

test.describe("Auth", () => {
  test("logs in with valid credentials", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill(process.env.E2E_EMAIL!);
    await page.getByLabel("Password").fill(process.env.E2E_PASSWORD!);
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page).toHaveURL(/dashboard/);
  });

  test("shows error for invalid login", async ({ page }) => {
    await page.goto("/login");

    await page.getByLabel("Email").fill("jest@test.com");
    await page.getByLabel("Password").fill("jestpass123");
    await page.getByRole("button", { name: "Log in" }).click();

    await expect(page).toHaveURL(/login/);
    await expect(page.getByText("Invalid email or password")).toBeVisible();
  });

  test("signs up a new user", async ({ page }) => {
    const email = `e2e-signup-${Date.now()}@test.com`;

    await page.goto("/signup");
    await page.getByLabel("Name").fill("E2E Signup");
    await page.getByLabel("Email").fill(email);
    await page.getByLabel("Password").fill(process.env.E2E_PASSWORD!);
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page).toHaveURL("/dashboard");
  });

  test("shows error when email already exists", async ({ page }) => {
    await page.goto("/signup");

    await page.getByLabel("Name").fill("E2E User");
    await page.getByLabel("Email").fill(process.env.E2E_EMAIL!);
    await page.getByLabel("Password").fill(process.env.E2E_PASSWORD!);
    await page.getByRole("button", { name: "Sign up" }).click();

    await expect(page.getByText("Email already in use")).toBeVisible();
    await expect(page).toHaveURL(/signup/);
  });
});
