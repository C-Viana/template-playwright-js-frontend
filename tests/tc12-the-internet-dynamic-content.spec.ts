import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { DynamicContentPage } from "../src/pages/DynamicContentPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Dynamic Content", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC12-TC01");
  const home = new HomePage(page, capture);
  const feature = new DynamicContentPage(page, capture);

  await home.navigate();
  await home.selectMenu("Dynamic Content");
  expect(await home.getTitle()).toBe(APP.title);

  await feature.validateDynamicImages();
});
