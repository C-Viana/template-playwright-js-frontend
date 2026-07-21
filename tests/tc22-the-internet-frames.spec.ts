import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { FramesPage } from "../src/pages/FramesPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Nested Frames", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC22-TC01");
  const home = new HomePage(page, capture);
  const feature = new FramesPage(page, capture);

  await home.navigate();
  await home.selectMenu("Frames");
  expect(await home.getTitle()).toBe(APP.title);

  await feature.validatePage();
  await feature.clickNestedFrames();
  await feature.validateAllFrames();
});

test("The Internet: IFrames", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC22-TC02");
  const home = new HomePage(page, capture);
  const feature = new FramesPage(page, capture);

  await home.navigate();
  await home.selectMenu("Frames");
  expect(await home.getTitle()).toBe(APP.title);
  
  await feature.validatePage();
  await feature.clickIFrame();
  await feature.closeModal();
  await feature.validateIFrameInputArea();
});
