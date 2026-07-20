import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { JavaScriptAlertsPage } from "../src/pages/JavaScriptAlertsPage.js";

test("The Internet: JavaScript Alerts", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC29-TC01");
  const home = new HomePage(page, capture);
  const feature = new JavaScriptAlertsPage(page, capture);

  await home.navigate();
  await home.selectMenu("JavaScript Alerts");
  await home.validateTitle();
  await feature.validatePage();
  await feature.dialogAlertType();
});

test("The Internet: JavaScript Confirm Accept", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC29-TC02");
  const home = new HomePage(page, capture);
  const feature = new JavaScriptAlertsPage(page, capture);

  await home.navigate();
  await home.selectMenu("JavaScript Alerts");
  await home.validateTitle();
  await feature.validatePage();
  await feature.dialogConfirmType("accept", "Ok");
});

test("The Internet: JavaScript Confirm Dismiss", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC29-TC03");
  const home = new HomePage(page, capture);
  const feature = new JavaScriptAlertsPage(page, capture);

  await home.navigate();
  await home.selectMenu("JavaScript Alerts");
  await home.validateTitle();
  await feature.validatePage();
  await feature.dialogConfirmType("dismiss", "Cancel");
});

test("The Internet: JavaScript Prompt Accept", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC29-TC04");
  const home = new HomePage(page, capture);
  const feature = new JavaScriptAlertsPage(page, capture);

  await home.navigate();
  await home.selectMenu("JavaScript Alerts");
  await home.validateTitle();
  await feature.validatePage();
  await feature.dialogPromptType("accept", "Typed test message");
});

test("The Internet: JavaScript Prompt Dismiss", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC29-TC05");
  const home = new HomePage(page, capture);
  const feature = new JavaScriptAlertsPage(page, capture);

  await home.navigate();
  await home.selectMenu("JavaScript Alerts");
  await home.validateTitle();
  await feature.validatePage();
  await feature.dialogPromptType("accept", "");
});
