import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class DropdownPage {
  page: Page;
  capture: ScreenshotHelper;
  contextDiv: Locator;
  dropdown: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.contextDiv = this.page.locator("#hot-spot");
    this.dropdown = this.page.locator("select#dropdown");
  }

  async validateInitialState() {
    const currentOption = await this.dropdown.evaluate(
      (sel: HTMLSelectElement) =>
        sel.options[sel.options.selectedIndex].textContent,
    );
    expect(currentOption).toBe("Please select an option");
  }

  /**
   *
   * @param {number} index
   */
  async selectByIndex(index: number) {
    await this.dropdown.selectOption({ index: index });
    await this.capture.viewport(
      DIR.results_folder,
      `option-${index}-selected`,
    );
  }

  /**
   *
   * @param {string} expectedValue
   */
  async validateSelectedValue(expectedValue: string) {
    const currentOption = await this.dropdown.evaluate(
      (sel: HTMLSelectElement) =>
        sel.options[sel.options.selectedIndex].textContent,
    );
    expect(currentOption).toBe(expectedValue);
  }
}
