import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { KeyPressesPage } from "../src/pages/KeyPressesPage.js";

test("The Internet: Key Presses", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC31-TC01");
  const home = new HomePage(page, capture);
  const feature = new KeyPressesPage(page, capture);

  await home.navigate();
  await home.selectMenu("Key Presses");
  await home.validateTitle();
  await feature.validatePage();
  await feature.validateKeyEvent("ArrowUp", "UP");
  await feature.validateKeyEvent("Control", "CONTROL");
  await feature.validateKeyEvent("a", "A");
  await feature.validateKeyEvent("2", "2");
});
