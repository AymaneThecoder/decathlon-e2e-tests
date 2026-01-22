import { test, expect } from "@playwright/test";

test("consulter les avis clients d'un produit", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");

  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  const searchBox = page.getByRole("searchbox", {
    name: "Rechercher un produit, un",
  });
  await searchBox.fill("bonnet");
  await searchBox.press("Enter");

  await page
    .locator(
      "div:nth-child(3) > .product-block-top-main > .dpb-models > .vtmn-relative > .vtmn-absolute",
    )
    .click();

  await page.getByRole("button", { name: /Voir les \d+ avis/i }).click();

  await expect(page.locator("#product-reviews__list")).toBeVisible();
});
