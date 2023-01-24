import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/New Remix App/);
});

test("get started link", async ({ page }) => {
  await page.goto("/");

  // Click the get started link.
  await page.getByRole("link", { name: "Log In" }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*login/);
});
