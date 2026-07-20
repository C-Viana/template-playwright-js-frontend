import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class KeyPressesPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  textInput: Locator;
  pageContent: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.textInput = this.page.locator("#target");
    this.pageContent = this.page.locator("#result");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Key Presses");
  }

  /**
   *
   * @param {string} key
   * @param {string} expectedResponse
   */
  async validateKeyEvent(key: string, expectedResponse: string) {
    await this.textInput.press(key, { delay: 500 });
    expect(await this.pageContent.textContent()).toBe(
      `You entered: ${expectedResponse}`,
    );
    await this.capture.viewport(DIR.results_folder, `Key-${key}.png`);
  }
}
