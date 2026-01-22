import { test, expect } from "@playwright/test";

test("filtrer les produits par prix max 100€", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");
  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  const searchBox = page.getByRole("searchbox", {
    name: "Rechercher un produit, un",
  });
  await searchBox.fill("chaussure");
  await searchBox.press("Enter");

  await page.waitForLoadState("networkidle");

  const priceInput = page.getByRole("spinbutton", { name: "Max. (€)" });
  await priceInput.clear();
  await priceInput.fill("100");
  await priceInput.press("Enter");

  await page.waitForTimeout(3000);

  await expect(priceInput).toHaveValue("100");

  expect(page.url()).toContain("chaussure");
});
