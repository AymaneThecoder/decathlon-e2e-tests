import { test, expect } from "@playwright/test";

test("modifier la quantité d'un produit dans le panier", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");
  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  const searchBox = page.getByRole("searchbox", {
    name: "Rechercher un produit, un",
  });
  await searchBox.fill("bonnet");
  await searchBox.press("Enter");

  await page
    .locator(
      "div:nth-child(6) > .product-block-top-main > .dpb-models > .vtmn-relative > .vtmn-absolute",
    )
    .click();

  await page.getByRole("button", { name: "Ajouter au panier" }).click();

  // NAVIGATION DIRECTE
  await page.goto("https://www.decathlon.fr/checkout/cart");
  await expect(page.locator("h1")).toContainText("Panier");

  await page.getByRole("button", { name: "Plus", exact: true }).first().click();
  await page.waitForTimeout(1000); // Petite pause pour l'API

  await page.getByRole("button", { name: "Plus", exact: true }).first().click();
  await page.waitForTimeout(1000);

  // Vérification
  const quantityDisplay = page
    .locator('input[type="number"]')
    .or(page.locator('[aria-label="Quantité"]'));

  await expect(quantityDisplay).toHaveValue("3");
});
