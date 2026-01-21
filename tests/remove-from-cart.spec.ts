import { test, expect } from "@playwright/test";

test("supprimer un produit du panier", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");

  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  const searchBox = page.getByRole("searchbox", {
    name: "Rechercher un produit, un",
  });
  await searchBox.fill("ballon de football");
  await searchBox.press("Enter");

  await page
    .locator(
      "div:nth-child(6) > .product-block-top-main > .dpb-models > .vtmn-relative > .vtmn-absolute",
    )
    .click();

  await page.getByRole("button", { name: "Ajouter au panier" }).click();

  await page.getByRole("link", { name: "1 Mon panier" }).click();

  await page.getByRole("button", { name: "Supprimer" }).click();

  await expect(page.getByText("Votre panier est vide")).toBeVisible();
});
