import { test as setup, expect } from "@playwright/test";

const authFile = "e2e/.auth/user.json";
const apiUrl = process.env.API_URL ?? "http://localhost:3001";

setup("authenticate", async ({ page, request }) => {
  const email = process.env.E2E_EMAIL;
  const password = process.env.E2E_PASSWORD;

  if (!email || !password) {
    throw new Error("Set E2E_EMAIL and E2E_PASSWORD in .env.local");
  }

  await request.post(`${apiUrl}/auth/register`, {
    data: { email, password, name: "E2E User" },
    failOnStatusCode: false,
  });

  await page.goto("/login");
  await page.getByLabel("Email").fill(email);
  await page.getByLabel("Password").fill(password);
  await page.getByRole("button", { name: "Log in" }).click();

  await expect(page).toHaveURL(/dashboard/);

  await page.context().storageState({ path: authFile });
});
