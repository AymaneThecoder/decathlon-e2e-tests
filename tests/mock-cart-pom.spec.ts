import { test } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { MockHelper } from "../pages/MockHelper";

test("mock localStorage avec POM", async ({ page }) => {
  const mockHelper = new MockHelper(page);
  const homePage = new HomePage(page);

  await mockHelper.injectMockCart();

  await homePage.goto();
  await homePage.rejectCookies();

  await mockHelper.verifyMockDataInjected();
});
