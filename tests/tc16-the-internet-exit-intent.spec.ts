import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { ExitIntentPage } from "../src/pages/ExitIntentPage.js";

test("The Internet: Exit Intent", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC16-TC01");
  const home = new HomePage(page, capture);
  const feature = new ExitIntentPage(page, capture);

  await home.navigate();
  await home.selectMenu("Exit Intent");
  await home.validateTitle();
  await feature.moveMouseOutside();
  await feature.waitModal();
  await feature.validateModal();
  await feature.closeModal();
});
