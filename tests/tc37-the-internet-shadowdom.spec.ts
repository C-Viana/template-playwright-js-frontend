import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { ShadowDOMPage } from "../src/pages/ShadowDOMPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Shadow DOM", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC37-TC01");
  const home = new HomePage(page, capture);
  const feature = new ShadowDOMPage(page, capture);

  await home.navigate();
  await home.selectMenu("Shadow DOM");
  expect(await home.getTitle()).toBe(APP.title);
  
  await feature.validatePageContent();
  await feature.validateShadowDomContent();
});
