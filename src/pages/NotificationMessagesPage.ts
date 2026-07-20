import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class NotificationMessagesPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  button: Locator;
  notification: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.button = this.page.locator("div.example > p > a");
    this.notification = this.page.locator("#flash");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Notification Message");
  }

  async clickButton() {
    await this.button.click();
    await this.page.waitForLoadState();
  }

  /**
   *
   * @param {string[]} expectedMessages
   */
  async validateNotification(expectedMessages: string[]) {
    const currentMessage = await this.notification.textContent();
    await this.capture.component(
      this.notification,
      DIR.results_folder,
      "Notification-Validated.png",
    );
    expect(expectedMessages).toContain(currentMessage?.split("\n")[1].trim());
  }
}
