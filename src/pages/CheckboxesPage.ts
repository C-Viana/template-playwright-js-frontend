import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class CheckboxesPage {
  page: Page;
  capture: ScreenshotHelper;
  checkboxLocators: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.checkboxLocators = this.page.locator("#checkboxes>input");
  }

  async getCheckboxes() {
    return await this.checkboxLocators.all();
  }

  /**
   *
   * @param {import('@playwright/test').Locator} locator
   */
  async check(locator: Locator) {
    await locator.click();
    await this.capture.viewport(DIR.results_folder, "click-performed");
  }

  /**
   *
   * @param {import('@playwright/test').Locator} locator
   * @param {boolean} status
   */
  async isChecked(locator: Locator, status: boolean) {
    await this.capture.component(
      locator,
      DIR.results_folder,
      `input-${status === false ? "unchecked" : "checked"}`,
    );
    if (status === false)
      expect(await locator.getAttribute("checked")).toBe(null);
    else expect(await locator.getAttribute("checked")).not.toBe(null);
  }
}
