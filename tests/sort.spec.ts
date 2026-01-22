import { test, expect } from "@playwright/test";

test("trier les produits par prix décroissant", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");
  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  const searchBox = page.getByRole("searchbox", {
    name: "Rechercher un produit, un",
  });
  await searchBox.fill("bonnet ski");
  await searchBox.press("Enter");

  await page.waitForLoadState("networkidle");

  await page.getByLabel("", { exact: true }).selectOption("2");

  await page.waitForTimeout(3000);

  expect(page.url()).toContain("sort=desc");

  await expect(page.getByLabel("", { exact: true })).toHaveValue("2");
});
