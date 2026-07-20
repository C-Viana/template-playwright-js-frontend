import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { HoversPage } from "../src/pages/HoversPage.js";

test("The Internet: Hovers", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC25-TC01");
  const home = new HomePage(page, capture);
  const feature = new HoversPage(page, capture);

  await home.navigate();
  await home.selectMenu("Hovers");
  await home.validateTitle();
  await feature.validatePage();
  await feature.validateAllFigures();
});
