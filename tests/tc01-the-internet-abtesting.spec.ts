import { test } from "@playwright/test";
import { HomePage } from "./../src/pages/HomePage.js";
import { ABTestingVariationPage } from "./../src/pages/ABTestingVariationPage.js";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";

test("The Internet: A/B Testing", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC01-TC01");
  const home = new HomePage(page, capture);
  const featurePage = new ABTestingVariationPage(page, capture);

  await home.navigate();
  await home.selectMenu("A/B Testing");
  await home.validateTitle();
  await featurePage.validatePage();
});
