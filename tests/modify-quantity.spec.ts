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
  await page.getByRole("link", { name: "Visualiser mon panier" }).click();

  // ⬇️ ATTENDRE ET CLIQUER
  await page.getByRole("button", { name: "Plus", exact: true }).click();
  await page.waitForTimeout(1000); // Attendre la mise à jour

  await page.getByRole("button", { name: "Plus", exact: true }).click();
  await page.waitForTimeout(1000); // Attendre la mise à jour

  // ⬇️ VÉRIFICATION DIFFÉRENTE
  // Au lieu de vérifier le badge du header, vérifier dans le panier
  const quantityDisplay = page
    .locator('input[type="number"]')
    .or(page.locator('[aria-label="Quantité"]'));
  await expect(quantityDisplay).toHaveValue("3");
});
