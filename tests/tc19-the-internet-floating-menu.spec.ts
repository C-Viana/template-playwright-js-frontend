import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { FloatingMenuPage } from "../src/pages/FloatingMenuPage.js";

test("The Internet: Floating Menu", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC19-TC01");
  const home = new HomePage(page, capture);
  const feature = new FloatingMenuPage(page, capture);

  await home.navigate();
  await home.selectMenu("Floating Menu");
  await home.validateTitle();
  await feature.validatePage();
  await feature.scrollPageDown();
  await feature.validateMenu();
});
