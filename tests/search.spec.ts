import { test, expect } from "@playwright/test";

test("rechercher des chaussures running", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");

  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  const searchBox = page.getByRole("searchbox", {
    name: "Rechercher un produit, un",
  });
  await searchBox.fill("chaussures running");

  await page.getByRole("link", { name: " chaussure running" }).click();

  await expect(page.locator("h1")).toBeVisible();
});
