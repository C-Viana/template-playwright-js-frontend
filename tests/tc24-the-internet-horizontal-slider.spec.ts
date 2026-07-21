import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { HorizontalSliderPage } from "../src/pages/HorizontalSliderPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Horizontal Slider", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC24-TC01");
  const home = new HomePage(page, capture);
  const feature = new HorizontalSliderPage(page, capture);

  await home.navigate();
  await home.selectMenu("Horizontal Slider");
  expect(await home.getTitle()).toBe(APP.title);

  await feature.validatePage();
  await feature.validateCurrentRangeValue("0");
  const amount = feature.getRandomValue();
  await feature.setValue(amount);
  await feature.validateCurrentRangeValue(`${amount * 0.5}`);
});
