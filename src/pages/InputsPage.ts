import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class InputsPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  input: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.input = this.page.locator('input[type="number"]');
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Inputs");
  }

  async setValue(inputValue: string) {
    await this.input.fill(inputValue, { timeout: 500 });
    expect(await this.input.inputValue()).toBe(inputValue);
    await this.capture.viewport(DIR.results_folder, "Value-Typed.png");
    await this.input.clear();
  }

  async performKeyAction(inputValue: string, expectedOutputValue: string) {
    await this.input.focus();
    await this.input.press(inputValue, { delay: 500 });
    expect(await this.input.inputValue()).toBe(expectedOutputValue);
    await this.capture.viewport(DIR.results_folder, "Value-Typed.png");
    await this.input.clear();
  }
}
