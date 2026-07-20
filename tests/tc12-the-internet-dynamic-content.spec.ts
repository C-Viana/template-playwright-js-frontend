import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { DynamicContentPage } from "../src/pages/DynamicContentPage.js";

test("The Internet: Dynamic Content", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC12-TC01");
  const home = new HomePage(page, capture);
  const feature = new DynamicContentPage(page, capture);

  await home.navigate();
  await home.selectMenu("Dynamic Content");
  await home.validateTitle();
  await feature.validateDynamicImages();
});
