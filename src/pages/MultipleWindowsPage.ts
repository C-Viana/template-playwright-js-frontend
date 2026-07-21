import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class MultipleWindowsPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  button: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.button = this.page.locator("#content > div > a");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Opening a new window");
  }

  async clickButton() {
    await this.button.click({ delay: 500 });
  }

  /**
   *
   * @param {import('@playwright/test').Page} newPage
   */
  async validateNewPage(newPage: Page) {
    await newPage.waitForLoadState();
    expect(await newPage.locator("h3").textContent()).toBe("New Window");
    const path = `${DIR.results_folder}/${this.capture.getTestName()}/${this.capture.useCounter()}-second-tab.png`
    await newPage.screenshot({
      path: path,
      fullPage: false,
    });
  }
}
