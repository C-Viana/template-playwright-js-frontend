import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class HorizontalSliderPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  inputRange: Locator;
  rangeValue: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.inputRange = this.page.locator('input[type="range"]');
    this.rangeValue = this.page.locator("#range");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Horizontal Slider");
  }

  async validateCurrentRangeValue(expectedValue: string) {
    expect(await this.rangeValue.textContent({ timeout: 2000 })).toBe(
      expectedValue,
    );
  }

  getRandomValue() {
    return Math.floor(Math.random() * 11);
  }

  async setValue(value: number) {
    await this.inputRange.focus();
    for (let index = 0; index < value; index++) {
      await this.inputRange.press("ArrowRight", { delay: 500 });
    }
    await this.capture.viewport(DIR.results_folder, "Value-Changed");
  }
}
