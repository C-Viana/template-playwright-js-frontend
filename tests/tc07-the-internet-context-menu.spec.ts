import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { ContextMenuPage } from "../src/pages/ContextMenuPage.js";

test("The Internet: Context Menu", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC07-TC01");
  const home = new HomePage(page, capture);
  const feature = new ContextMenuPage(page, capture);

  await home.navigate();
  await home.selectMenu("Context Menu");
  await home.validateTitle();

  await feature.validateContextComponent();
  await feature.openContextMenu();
});
