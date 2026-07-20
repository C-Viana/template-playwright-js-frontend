import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { LargeDeepDOMPage } from "../src/pages/LargeDeepDOMPage.js";

test("The Internet: Large & Deep DOM", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC32-TC01");
  const home = new HomePage(page, capture);
  const feature = new LargeDeepDOMPage(page, capture);

  await home.navigate();
  await home.selectMenu("Large & Deep DOM");
  await home.validateTitle();
  await feature.validatePage();
  await feature.validateSiblingElement(25, 500);
  await feature.validateTableElement(300, 300);
});
