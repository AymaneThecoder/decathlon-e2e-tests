import { Page, expect } from "@playwright/test";

export class ProductReviewsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickReviewsButton() {
    await this.page.getByRole("button", { name: /Voir les \d+ avis/i }).click();
  }

  async verifyReviewsSectionVisible() {
    await expect(this.page.locator("#product-reviews__list")).toBeVisible();
  }
}
