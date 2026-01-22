import { test, expect } from "@playwright/test";

test("accéder à la page recherche de magasins", async ({ page }) => {
  await page.goto("https://www.decathlon.fr/");

  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  await page.getByRole("link", { name: "Mon magasin" }).click();

  await expect(
    page.getByRole("searchbox", { name: "Rechercher un emplacement" }),
  ).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Géolocalisez moi" }),
  ).toBeVisible();

  await expect(page.locator(".gm-style")).toBeVisible();
});
