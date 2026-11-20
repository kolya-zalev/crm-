import { test, expect } from "@playwright/test";

test.describe("Chat", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/chat");
    await expect(page.getByPlaceholder("Write a message…")).toBeVisible();
  });

  test("Send message", async ({ page }) => {
    const text = `hello-${Date.now()}`;
    await page.getByPlaceholder("Write a message…").fill(text);
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText(text)).toBeVisible();
  });

  test("Author name is visible", async ({ page }) => {
    const text = `author-${Date.now()}`;
    await page.getByPlaceholder("Write a message…").fill(text);
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText(text)).toBeVisible();
  });

  test("Send message by Enter", async ({ page }) => {
    const text = `enter-${Date.now()}`;
    const input = page.getByPlaceholder("Write a message…");
    await input.fill(text);
    await input.press("Enter");
    await expect(page.getByText(text)).toBeVisible();
  });

  test("Input is cleared after sending", async ({ page }) => {
    await page.getByPlaceholder("Write a message…").fill("Clear");
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByPlaceholder("Write a message…")).toHaveValue("");
  });

  test("Message persists after reload", async ({ page }) => {
    const text = `persist-${Date.now()}`;
    await page.getByPlaceholder("Write a message…").fill(text);
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText(text)).toBeVisible();
    await page.reload();
    await expect(page.getByPlaceholder("Write a message…")).toBeVisible();
    await expect(page.getByText(text)).toBeVisible();
  });

  test("Send button disabled when empty", async ({ page }) => {
    await expect(page.getByRole("button", { name: "Send" })).toBeDisabled();
  });

  test("Whitespace only message is not sent", async ({ page }) => {
    await page.getByPlaceholder("Write a message…").fill("  ");
    await expect(page.getByRole("button", { name: "Send" })).toBeDisabled();
  });

  test("Message too long shows error", async ({ page }) => {
    await page.getByPlaceholder("Write a message…").fill("a".repeat(2001));
    await page.getByRole("button", { name: "Send" }).click();
    await expect(page.getByText("Failed to send message")).toBeVisible();
  });
});
