import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { FormAuthenticationPage } from "../src/pages/FormAuthenticationPage.js";

test("The Internet: Form Authentication", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC21-TC01");
  const home = new HomePage(page, capture);
  const feature = new FormAuthenticationPage(page, capture);

  await home.navigate();
  await home.selectMenu("Form Authentication");
  await home.validateTitle();
  await feature.validatePage();
  await feature.setFormData();
  await feature.clickLogin();
  await feature.validateLogin();
  await feature.clickLogout();
  await feature.validateLogout();
});
