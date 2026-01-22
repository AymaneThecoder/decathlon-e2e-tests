import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { StoreLocatorPage } from "../pages/StoreLocatorPage";

test("rechercher un magasin avec POM", async ({ page }) => {
  const homePage = new HomePage(page);
  const storeLocator = new StoreLocatorPage(page);

  await homePage.goto();
  await homePage.rejectCookies();
  await storeLocator.goToStoreLocator();
  await storeLocator.verifySearchBoxVisible();
  await storeLocator.verifyGeolocationButtonVisible();
  await storeLocator.verifyMapVisible();
});
