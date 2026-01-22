import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { SearchResultsPage } from "../pages/SearchResultsPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";

test("modifier la quantité avec POM", async ({ page }) => {
  const homePage = new HomePage(page);
  const searchPage = new SearchResultsPage(page);
  const productPage = new ProductPage(page);
  const cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.rejectCookies();
  await homePage.search("bonnet");
  await searchPage.clickFirstProduct();
  await productPage.addToCart();

  await page.getByRole("link", { name: "Visualiser mon panier" }).click();

  await cartPage.increaseQuantity(2);

  await cartPage.verifyQuantityInCart("3");
});
