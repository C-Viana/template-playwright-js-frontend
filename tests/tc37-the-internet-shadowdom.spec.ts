import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { ShadowDOMPage } from "../src/pages/ShadowDOMPage.js";

test("The Internet: Shadow DOM", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC37-TC01");
  const home = new HomePage(page, capture);
  const feature = new ShadowDOMPage(page, capture);

  await home.navigate();
  await home.selectMenu("Shadow DOM");
  await home.validateTitle();
  await feature.validatePageContent();
  await feature.validateShadowDomContent();
});
