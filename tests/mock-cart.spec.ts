import { test, expect } from "@playwright/test";

test("mock localStorage - injection de données", async ({ page }) => {
  await page.addInitScript(() => {
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

  await page.goto("https://www.decathlon.fr/");

  await page.getByRole("button", { name: "Tout refuser et fermer" }).click();

  const localStorageData = await page.evaluate(() => {
    return localStorage.getItem("clickstream/navigation");
  });

  expect(localStorageData).toContain("999001");
  expect(localStorageData).toContain("Ballon de football mocké");
  expect(localStorageData).toContain("999002");
  expect(localStorageData).toContain("Chaussures de randonnée mockées");
});
