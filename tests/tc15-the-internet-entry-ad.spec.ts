import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { EntryAdPage } from "../src/pages/EntryAdPage.js";

test("The Internet: Entry Ad", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC15-TC01");
  const home = new HomePage(page, capture);
  const feature = new EntryAdPage(page, capture);

  await home.navigate();
  await home.selectMenu("Entry Ad");

  await feature.validateModalComponent();
  await feature.clickModalButton();
  await feature.validateModalIsHidden();
});
