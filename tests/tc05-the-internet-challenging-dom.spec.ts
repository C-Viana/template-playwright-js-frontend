import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { ChallengingDomPage } from "../src/pages/ChallengingDomPage.js";

test("The Internet: Challenging DOM - Buttons", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC05-TC01");
  const home = new HomePage(page, capture);
  const feature = new ChallengingDomPage(page, capture);

  await home.navigate();
  await home.selectMenu("Challenging DOM");
  await home.validateTitle();

  const buttons = await feature.getButtons();
  await feature.validateButton(buttons[0], "blue");
  await feature.validateButton(buttons[1], "red");
  await feature.validateButton(buttons[2], "green");
});

test("The Internet: Challenging DOM - Canvas text", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC05-TC02");
  const home = new HomePage(page, capture);
  const feature = new ChallengingDomPage(page, capture);

  await home.navigate();
  await home.selectMenu("Challenging DOM");
  await home.validateTitle();

  await feature.validateCanvasContentPattern("Answer:\\s\\d{5}");
});
