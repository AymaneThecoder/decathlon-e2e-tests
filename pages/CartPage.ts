import { Page, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Dans pages/CartPage.ts

  // Dans pages/CartPage.ts

  async goToCart() {
    // 1. On appuie sur "Echap" pour fermer les éventuelles pop-ups (cookies, confirmation ajout, etc.)
    await this.page.keyboard.press("Escape");

    // 2. On attend une demi-seconde que l'animation de fermeture finisse
    await this.page.waitForTimeout(500);

    // 3. On clique sur le panier du header (avec une Regex pour ignorer le "1" ou "0")
    await this.page
      .getByRole("link", { name: /Mon panier/ })
      .first()
      .click();
  }

  async verifyCartCount(count: number) {
    await expect(
      this.page.getByRole("link", {
        name: new RegExp(`${count} Mon panier`, "i"),
      }),
    ).toBeVisible();
  }

  async removeFromCart() {
    await this.page.getByRole("button", { name: "Supprimer" }).click();
  }

  async verifyCartEmpty() {
    await expect(this.page.getByText("Votre panier est vide")).toBeVisible();
  }
  async increaseQuantity(times: number = 1) {
    for (let i = 0; i < times; i++) {
      await this.page
        .getByRole("button", { name: "Plus", exact: true })
        .click();
      await this.page.waitForTimeout(1000);
    }
  }

  async verifyQuantityInCart(expectedQuantity: string) {
    const quantityInput = this.page
      .locator('input[type="number"]')
      .or(this.page.locator('[aria-label="Quantité"]'));
    await expect(quantityInput).toHaveValue(expectedQuantity);
  }
}
