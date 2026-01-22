import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

test("trier par prix avec POM", async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.rejectCookies();
  await homePage.search("bonnet ski");
  await searchPage.sortByPriceDescending();

  expect(page.url()).toContain("sort=desc");

  await expect(page.getByLabel("", { exact: true })).toHaveValue("2");
});
