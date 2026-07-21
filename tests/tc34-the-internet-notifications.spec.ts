import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { NotificationMessagesPage } from "../src/pages/NotificationMessagesPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Notification Messages", async ({ page }) => {
  const expectedMessages: string[] = [
    "Action unsuccesful, please try again",
    "Action successful",
  ];

  const capture = new ScreenshotHelper(page, "SC34-TC01");
  const home = new HomePage(page, capture);
  const feature = new NotificationMessagesPage(page, capture);

  await home.navigate();
  await home.selectMenu("Notification Messages");
  expect(await home.getTitle()).toBe(APP.title);

  await feature.validatePage();
  await feature.validateNotification(expectedMessages);
  await feature.clickButton();
  await feature.validateNotification(expectedMessages);
});
