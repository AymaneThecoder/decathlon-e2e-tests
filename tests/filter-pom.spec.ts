import { test, expect } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";

test("filtrer par prix avec POM", async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchResultsPage(page);

  await homePage.goto();
  await homePage.rejectCookies();
  await homePage.search("chaussure");
  await searchPage.filterByMaxPrice("100");

  // Vérifier que le filtre est appliqué
  const priceInput = page.getByRole("spinbutton", { name: "Max. (€)" });
  await expect(priceInput).toHaveValue("100");
});
