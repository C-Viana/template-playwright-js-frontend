import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { RedirectLinkPage } from "../src/pages/RedirectLinkPage.js";

const expectedCodes: string[] = ["200", "301", "404", "500"];

test("The Internet: Redirect Link - Status Code", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC35-TC01");
  const home = new HomePage(page, capture);
  const feature = new RedirectLinkPage(page, capture);

  await home.navigate();
  await home.selectMenu("Redirect Link");
  await home.validateTitle();
  await feature.validatePage();
  await feature.clickRedirection();
  await feature.validateAllRedirections(expectedCodes);
});
