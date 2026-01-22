import { expect, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToCart() {
    console.log("Navigation directe vers le panier via URL...");
    await this.page.goto("https://www.decathlon.fr/checkout/cart", {
      timeout: 60000,
    });
    await expect(this.page.locator("h1")).toContainText("Panier", {
      timeout: 10000,
    });
  }

  async verifyCartCount(count: number) {
    await expect(
      this.page.getByRole("link", {
        name: new RegExp(`${count} Mon panier`, "i"),
      }),
    ).toBeVisible();
  }

  async removeFromCart() {
    await this.page.getByRole("button", { name: "Supprimer" }).first().click();
  }

  async verifyCartEmpty() {
    await expect(this.page.getByText("Votre panier est vide")).toBeVisible();
  }

  async increaseQuantity(times: number = 1) {
    const plusButton = this.page
      .getByRole("button", { name: "Plus", exact: true })
      .first();
    const quantityInput = this.page
      .locator('input[type="number"]')
      .or(this.page.locator('[aria-label="Quantité"]'));

    for (let i = 0; i < times; i++) {
      const currentValue = await quantityInput.inputValue();
      const nextValue = (parseInt(currentValue) + 1).toString();

      await plusButton.click({ force: true });

      await expect(quantityInput).toHaveValue(nextValue, { timeout: 10000 });
    }
  }

  async verifyQuantityInCart(expectedQuantity: string) {
    const quantityInput = this.page
      .locator('input[type="number"]')
      .or(this.page.locator('[aria-label="Quantité"]'));
    await expect(quantityInput).toHaveValue(expectedQuantity);
  }
}
