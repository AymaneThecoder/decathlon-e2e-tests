import { test, expect } from "@playwright/test";

test("supprimer un produit du panier", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");

  // Gestion des cookies
  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  // Recherche du produit
  const searchBox = page.getByRole("searchbox", {
    name: "Rechercher un produit, un",
  });
  await searchBox.fill("ballon de football");
  await searchBox.press("Enter");

  // Clic sur le premier résultat
  await page
    .locator(
      "div:nth-child(6) > .product-block-top-main > .dpb-models > .vtmn-relative > .vtmn-absolute",
    )
    .click();

  // Ajout au panier
  await page.getByRole("button", { name: "Ajouter au panier" }).click();

  // --- NAVIGATION DIRECTE ---
  await page.goto("https://www.decathlon.fr/checkout/cart");

  // 1. On attend que le titre Panier soit là
  await expect(page.locator("h1")).toContainText("Panier");

  // 2. CORRECTION ICI : On attend que l'article soit chargé visuellement
  // Cela force le test à attendre que la liste des produits apparaisse
  await expect(page.getByText(/ballon/i).first()).toBeVisible({
    timeout: 10000,
  });

  // 3. Maintenant que l'article est là, le bouton "Supprimer" l'est aussi. On clique.
  // On utilise .first() car parfois il y a plusieurs icônes poubelles cachées
  await page.getByRole("button", { name: "Supprimer" }).first().click();

  // Validation finale
  await expect(page.getByText("Votre panier est vide")).toBeVisible();
});
