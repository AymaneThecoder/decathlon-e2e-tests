import { Page } from "@playwright/test";

export class SearchResultsPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickFirstProduct() {
    await this.page
      .locator(
        "div:nth-child(6) > .product-block-top-main > .dpb-models > .vtmn-relative > .vtmn-absolute",
      )
      .click();
  }

  async filterByMaxPrice(maxPrice: string) {
    const priceInput = this.page.getByRole("spinbutton", { name: "Max. (€)" });
    await priceInput.clear();
    await priceInput.fill(maxPrice);
    await priceInput.press("Enter");
    await this.page.waitForTimeout(3000);
  }
  async sortByPriceDescending() {
    await this.page.getByLabel("", { exact: true }).selectOption("2");
    await this.page.waitForTimeout(3000);
  }
}
