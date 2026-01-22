import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductReviewsPage } from "../pages/ProductReviewsPage";

test("consulter les avis avec POM", async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchResultsPage(page);
  const reviewsPage = new ProductReviewsPage(page);

  await homePage.goto();
  await homePage.rejectCookies();
  await homePage.search("bonnet");
  await searchPage.clickFirstProduct();
  await reviewsPage.clickReviewsButton();
  await reviewsPage.verifyReviewsSectionVisible();
});
