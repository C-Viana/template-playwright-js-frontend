import { Locator, Page } from "@playwright/test";

export class ScreenshotHelper {
  page: Page;
  testName: string;
  screenshotCounter: number;

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page: Page, testName: string) {
    this.page = page;
    this.testName = testName;
    this.screenshotCounter = 1;
  }

  useCounter(): number {
    const currentValue = this.screenshotCounter;
    this.screenshotCounter++;
    return currentValue;
  }

  getTestName(): string {
    return this.testName;
  }

  /**
   *
   * @param {string} resultsPath
   * @param {string} fileName
   */
  async fullpage(resultsPath: string, fileName: string) {
    await this.page.screenshot({
      path: `${resultsPath}/${this.testName}/${this.screenshotCounter}-${fileName}.png`,
      fullPage: true,
    });
    this.screenshotCounter++;
  }

  /**
   *
   * @param {string} resultsPath
   * @param {string} fileName
   */
  async viewport(resultsPath: string, fileName: string) {
    await this.page.screenshot({
      path: `${resultsPath}/${this.testName}/${this.screenshotCounter}-${fileName}.png`,
      fullPage: false,
    });
    this.screenshotCounter++;
  }

  /**
   *
   * @param {import('@playwright/test').Locator} locator
   * @param {string} resultsPath
   * @param {string} fileName
   */
  async component(locator: Locator, resultsPath: string, fileName: string) {
    await locator.screenshot({
      path: `${resultsPath}/${this.testName}/${this.screenshotCounter}-${fileName}.png`,
    });
    this.screenshotCounter++;
  }
}
