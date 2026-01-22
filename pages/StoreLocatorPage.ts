import { Page, expect } from "@playwright/test";

export class StoreLocatorPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goToStoreLocator() {
    await this.page.getByRole("link", { name: "Mon magasin" }).click();
  }

  async verifySearchBoxVisible() {
    await expect(
      this.page.getByRole("searchbox", { name: "Rechercher un emplacement" }),
    ).toBeVisible();
  }

  async verifyGeolocationButtonVisible() {
    await expect(
      this.page.getByRole("button", { name: "Géolocalisez moi" }),
    ).toBeVisible();
  }

  async verifyMapVisible() {
    await expect(this.page.locator(".gm-style")).toBeVisible();
  }
}
