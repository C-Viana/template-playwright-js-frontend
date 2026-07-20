import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { InputsPage } from "../src/pages/InputsPage.js";

test("The Internet: Inputs", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC27-TC01");
  const home = new HomePage(page, capture);
  const feature = new InputsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Inputs");
  await home.validateTitle();
  await feature.validatePage();
  await feature.setValue("100");
  await feature.performKeyAction("ArrowUp", "1");
  await feature.performKeyAction("ArrowDown", "-1");
});
