import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { DynamicLoadingPage } from "../src/pages/DynamicLoadingPage.js";

test("The Internet: Dynamic Loading - Waiting for hidden element to appear", async ({
  page,
}) => {
  const capture = new ScreenshotHelper(page, "SC14-TC01");
  const home = new HomePage(page, capture);
  const feature = new DynamicLoadingPage(page, capture);

  await home.navigate();
  await home.selectMenu("Dynamic Loading");

  await feature.clickFirstLink();
  await feature.isComponentHidden(true);
  await feature.clickStart();
  await feature.waitLoading();
  await feature.isComponentHidden(false);
});

test("The Internet: Dynamic Loading - Waiting for hidden element to render", async ({
  page,
}) => {
  const capture = new ScreenshotHelper(page, "SC14-TC02");
  const home = new HomePage(page, capture);
  const feature = new DynamicLoadingPage(page, capture);

  await home.navigate();
  await home.selectMenu("Dynamic Loading");

  await feature.clickSecondLink();
  await feature.isRenderedComponentAttached(false);
  await feature.clickStart();
  await feature.waitLoading();
  await feature.isRenderedComponentAttached(true);
});
