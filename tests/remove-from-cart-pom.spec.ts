import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

test("supprimer un produit du panier avec POM", async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchResultsPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.rejectCookies();
  await homePage.search("ballon de football");
  await searchPage.clickFirstProduct();
  await productPage.addToCart();
  await cartPage.goToCart();
  await cartPage.removeFromCart();
  await cartPage.verifyCartEmpty();
});
