import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { MultipleWindowsPage } from "../src/pages/MultipleWindowsPage.js";

test("The Internet: Multiple Windows", async ({ page, context }) => {
  const pagePromise = context.waitForEvent("page");

  const capture = new ScreenshotHelper(page, "SC33-TC01");
  const home = new HomePage(page, capture);
  const feature = new MultipleWindowsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Multiple Windows");
  await home.validateTitle();
  await feature.validatePage();
  await feature.clickButton();
  await feature.validateNewPage(await pagePromise);
});
