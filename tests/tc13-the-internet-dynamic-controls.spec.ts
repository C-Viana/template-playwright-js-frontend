import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { DynamicControlsPage } from "../src/pages/DynamicControlsPage.js";

test("The Internet: Dynamic Controls - Remove async element", async ({
  page,
}) => {
  const capture = new ScreenshotHelper(page, "SC13-TC01");
  const home = new HomePage(page, capture);
  const feature = new DynamicControlsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Dynamic Controls");

  await feature.clickRemove();
  await feature.waitLoading();
  await feature.validateRemoval();
});

test("The Internet: Dynamic Controls - Add async element", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC13-TC02");
  const home = new HomePage(page, capture);
  const feature = new DynamicControlsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Dynamic Controls");

  await feature.clickRemove();
  await feature.waitLoading();
  await feature.validateRemoval();

  await feature.clickAdd();
  await feature.waitLoading();
  await feature.validateAddition();
});

test("The Internet: Dynamic Controls - Enable and disable text input", async ({
  page,
}) => {
  const capture = new ScreenshotHelper(page, "SC13-TC03");
  const home = new HomePage(page, capture);
  const feature = new DynamicControlsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Dynamic Controls");

  await feature.fieldIsEnabled(false);
  await feature.clickEnable();

  await feature.fieldIsEnabled(true);
  await feature.clickDisable();

  await feature.fieldIsEnabled(false);
});
