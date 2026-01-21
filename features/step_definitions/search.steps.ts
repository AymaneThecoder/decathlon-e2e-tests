import {
  Given,
  When,
  Then,
  Before,
  After,
  setDefaultTimeout,
} from "@cucumber/cucumber";
import { chromium, Browser, Page, expect } from "@playwright/test";
import { HomePage } from "../../pages/HomePage";
import { SearchResultsPage } from "../../pages/SearchResultsPage";
import { ProductPage } from "../../pages/ProductPage";
import { CartPage } from "../../pages/CartPage";
import { StoreLocatorPage } from "../../pages/StoreLocatorPage";
import { ProductReviewsPage } from "../../pages/ProductReviewsPage";
import { MockHelper } from "../../pages/MockHelper";
setDefaultTimeout(60000);

let browser: Browser;
let page: Page;
let homePage: HomePage;
let searchPage: SearchResultsPage;
let productPage: ProductPage;
let cartPage: CartPage;
let storeLocatorPage: StoreLocatorPage;
let reviewsPage: ProductReviewsPage;
let mockHelper: MockHelper;

Before(async function () {
  browser = await chromium.launch({
    headless: false,
    slowMo: 100,
  });
  const context = await browser.newContext();
  page = await context.newPage();

  homePage = new HomePage(page);
  searchPage = new SearchResultsPage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);
  storeLocatorPage = new StoreLocatorPage(page);
  reviewsPage = new ProductReviewsPage(page);
  mockHelper = new MockHelper(page);
});

After(async function () {
  await browser.close();
});

Given("je suis sur la page Decathlon", async function () {
  await homePage.goto();
});

When("je refuse les cookies", async function () {
  await homePage.rejectCookies();
});

When("je recherche {string}", async function (productName: string) {
  await homePage.search(productName);
});

Then("je vois des résultats", async function () {
  await expect(page.locator("h1")).toBeVisible();
});

When("je clique sur le premier produit", async function () {
  await searchPage.clickFirstProduct();
});

When("j'ajoute au panier", async function () {
  await productPage.addToCart();
});

Then("le panier contient {int} produit", async function (count: number) {
  await cartPage.verifyCartCount(count);
});

When("je vais dans le panier", async function () {
  await cartPage.goToCart();
});

When("je supprime le produit", async function () {
  await cartPage.removeFromCart();
});

Then("le panier est vide", async function () {
  await cartPage.verifyCartEmpty();
});

When("je filtre par prix max {string}", async function (maxPrice: string) {
  await searchPage.filterByMaxPrice(maxPrice);
});

Then(
  "le filtre prix est appliqué à {string}",
  async function (expectedPrice: string) {
    const priceInput = page.getByRole("spinbutton", { name: "Max. (€)" });
    await expect(priceInput).toHaveValue(expectedPrice);
  },
);
When("je visualise mon panier", async function () {
  await page.getByRole("link", { name: "Visualiser mon panier" }).click();
});

When("j'augmente la quantité de {int}", async function (times: number) {
  await cartPage.increaseQuantity(times);
});

Then(
  "la quantité affichée est {string}",
  async function (expectedQuantity: string) {
    await cartPage.verifyQuantityInCart(expectedQuantity);
  },
);
When("je trie par prix décroissant", async function () {
  await searchPage.sortByPriceDescending();
});

Then("le tri est appliqué", async function () {
  expect(page.url()).toContain("sort=desc");
  await expect(page.getByLabel("", { exact: true })).toHaveValue("2");
});
When("je clique sur {string}", async function (linkText: string) {
  if (linkText === "Mon magasin") {
    await storeLocatorPage.goToStoreLocator();
  }
});

Then("la page recherche de magasins s'affiche", async function () {
  await storeLocatorPage.verifyMapVisible();
});

Then("je vois la barre de recherche", async function () {
  await storeLocatorPage.verifySearchBoxVisible();
});

Then("je vois le bouton de géolocalisation", async function () {
  await storeLocatorPage.verifyGeolocationButtonVisible();
});
When("je clique sur les avis clients", async function () {
  await reviewsPage.clickReviewsButton();
});

Then("la section avis s'affiche", async function () {
  await reviewsPage.verifyReviewsSectionVisible();
});
Given("je prépare des produits mockés dans localStorage", async function () {
  await mockHelper.injectMockCart();
});

Then("les données mockées sont présentes dans localStorage", async function () {
  await mockHelper.verifyMockDataInjected();
});
When("j'ouvre la page Decathlon", async function () {
  await homePage.goto();
});
