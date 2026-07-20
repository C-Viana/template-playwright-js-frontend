import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { JQueryUIMenusPage } from "../src/pages/JQueryUIMenusPage.js";

test("The Internet: JQuery UI Menus", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC28-TC01");
  const home = new HomePage(page, capture);
  const feature = new JQueryUIMenusPage(page, capture);

  await home.navigate();
  await home.selectMenu("JQuery UI Menus");
  await home.validateTitle();
  await feature.validatePage();
  await feature.validateMenuItems();
});
