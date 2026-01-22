import { Page, expect } from "@playwright/test";

export class MockHelper {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async injectMockCart() {
    await this.page.addInitScript(() => {
      const mockData = {
        items: {
          "999001": {
            id: "999001",
            name: "Ballon de football mocké",
            quantity: 1,
            price: 15.99,
          },
          "999002": {
            id: "999002",
            name: "Chaussures de randonnée mockées",
            quantity: 1,
            price: 34.99,
          },
        },
      };

      localStorage.setItem("clickstream/navigation", JSON.stringify(mockData));
    });
  }

  async verifyMockDataInjected() {
    const localStorageData = await this.page.evaluate(() => {
      return localStorage.getItem("clickstream/navigation");
    });

    expect(localStorageData).toContain("999001");
    expect(localStorageData).toContain("Ballon de football mocké");
    expect(localStorageData).toContain("999002");
    expect(localStorageData).toContain("Chaussures de randonnée mockées");
  }
}
