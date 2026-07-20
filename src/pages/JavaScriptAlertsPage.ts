import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class JavaScriptAlertsPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  buttonAlert: Locator;
  buttonConfirm: Locator;
  buttonPrompt: Locator;
  resultText: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.buttonAlert = this.page.locator('button[onclick="jsAlert()"]');
    this.buttonConfirm = this.page.locator('button[onclick="jsConfirm()"]');
    this.buttonPrompt = this.page.locator('button[onclick="jsPrompt()"]');
    this.resultText = this.page.locator("#result");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("JavaScript Alerts");
  }

  /**
   *
   * @param {string} expectedMessage
   * @param {'accept' | 'dismiss'} actionType
   * @param {string} inputMessage
   */
  async setDialogInteraction(
    expectedMessage: string,
    actionType: "accept" | "dismiss",
    inputMessage: string,
  ) {
    this.page.on("dialog", async (alert) => {
      expect(alert.message()).toBe(expectedMessage);
      if (actionType === "dismiss") await alert.dismiss();
      else {
        if (inputMessage == null || inputMessage == "") await alert.accept();
        else await alert.accept(inputMessage);
      }
    });
  }

  async dialogAlertType() {
    await this.setDialogInteraction("I am a JS Alert", "accept", "");

    await this.buttonAlert.click();
    expect(await this.resultText.textContent()).toBe(
      "You successfully clicked an alert",
    );
    await this.capture.viewport(DIR.results_folder, "Message-Visible.png");
  }

  /**
   *
   * @param {'accept' | 'dismiss'} action
   * @param {'Ok' | 'Cancel'} expectedResult
   */
  async dialogConfirmType(
    action: "accept" | "dismiss",
    expectedResult: "Ok" | "Cancel",
  ) {
    await this.setDialogInteraction("I am a JS Confirm", action, "");

    await this.buttonConfirm.click();
    expect(await this.resultText.textContent()).toBe(
      `You clicked: ${expectedResult}`,
    );
    await this.capture.viewport(DIR.results_folder, "Message-Visible.png");
  }

  /**
   *
   * @param {'accept' | 'dismiss'} action
   * @param {string?} inputMessage
   */
  async dialogPromptType(action: "accept" | "dismiss", inputMessage: string) {
    await this.setDialogInteraction("I am a JS prompt", action, inputMessage);

    await this.buttonPrompt.click();
    await this.capture.viewport(DIR.results_folder, "Message-Visible.png");
    if (inputMessage == null || inputMessage === "")
      expect(await this.resultText.textContent()).toBe(`You entered: `);
    else
      expect(await this.resultText.textContent()).toBe(
        `You entered: ${inputMessage}`,
      );
  }
}
