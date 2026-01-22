import { test, expect } from "@playwright/test";

test("ajouter un produit au panier", async ({ page }) => {
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

  await page.keyboard.press("Escape");
  await page.waitForTimeout(500);
  await page
    .getByRole("link", { name: /Mon panier/ })
    .first()
    .click();
  await expect(page.locator("h1")).toContainText("Panier");

  await expect(page.getByText(/ballon/i).first()).toBeVisible();
});
