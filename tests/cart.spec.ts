import { test, expect } from "@playwright/test";

test("ajouter un produit au panier", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");

  // Gestion cookies
  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  // Recherche
  const searchBox = page.getByRole("searchbox", {
    name: "Rechercher un produit, un",
  });
  await searchBox.fill("ballon de football");
  await searchBox.press("Enter");

  // Clic sur le premier produit
  await page
    .locator(
      "div:nth-child(6) > .product-block-top-main > .dpb-models > .vtmn-relative > .vtmn-absolute",
    )
    .click();

  // Ajout au panier
  await page.getByRole("button", { name: "Ajouter au panier" }).click();

  // NAVIGATION DIRECTE (Solution Magique)
  await page.goto("https://www.decathlon.fr/checkout/cart");

  // Vérification
  await expect(page.locator("h1")).toContainText("Panier");
  await expect(page.getByText(/ballon/i).first()).toBeVisible();
});
