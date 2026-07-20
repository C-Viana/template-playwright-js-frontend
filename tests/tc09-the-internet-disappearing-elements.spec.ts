import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { DisappearingElementsPage } from "../src/pages/DisappearingElementsPage.js";

test("The Internet: Disappearing Elements", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC09-TC01");
  const home = new HomePage(page, capture);
  const feature = new DisappearingElementsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Disappearing Elements");

  await feature.validateMenu();
});
