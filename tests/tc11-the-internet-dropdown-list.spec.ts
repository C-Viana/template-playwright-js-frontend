import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { DropdownPage } from "../src/pages/DropdownPage.js";

test("The Internet: Dropdown List", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC11-TC01");
  const home = new HomePage(page, capture);
  const feature = new DropdownPage(page, capture);

  await home.navigate();
  await home.selectMenu("Dropdown");
  await home.validateTitle();

  await feature.validateInitialState();
  await feature.selectByIndex(1);
  await feature.validateSelectedValue("Option 1");
  await feature.selectByIndex(2);
  await feature.validateSelectedValue("Option 2");
});
