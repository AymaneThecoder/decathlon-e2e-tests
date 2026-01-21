import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("https://www.decathlon.fr/");
  }

  async rejectCookies() {
    await this.page
      .getByRole("button", { name: "Tout refuser et fermer" })
      .click();
  }

  async search(productName: string) {
    const searchBox = this.page.getByRole("searchbox", {
      name: "Rechercher un produit, un",
    });
    await searchBox.fill(productName);

    await searchBox.press("Enter", { timeout: 60000 });

    await this.page.waitForTimeout(3000);
  }
}
