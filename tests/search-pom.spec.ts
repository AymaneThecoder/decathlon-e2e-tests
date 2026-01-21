import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";

test("rechercher avec POM", async ({ page }) => {
  const homePage = new HomePage(page);

  await homePage.goto();
  await homePage.rejectCookies();
  await homePage.search("chaussure running");

  await expect(page.locator("h1")).toBeVisible();
});
