import { expect, test } from "@playwright/test";
import { HomePage } from "./../src/pages/HomePage.js";
import { ABTestingVariationPage } from "./../src/pages/ABTestingVariationPage.js";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: A/B Testing", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC01-TC01");
  const home = new HomePage(page, capture);
  const featurePage = new ABTestingVariationPage(page, capture);

  await home.navigate();
  await home.selectMenu("A/B Testing");
  expect(await home.getTitle()).toBe(APP.title);

  expect(await featurePage.getPageTitle()).toMatch(
    new RegExp("A/B Test Control|A/B Test Variation \\d"),
  );
  expect(await featurePage.getBodyContent()).toContain("Also known as split testing");
});
