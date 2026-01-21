import { Page, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    await this.page.getByRole("link", { name: "1 Mon panier" }).click();
    await this.page.waitForTimeout(2000);
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
