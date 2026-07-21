import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class RedirectLinkPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  featureButton: Locator;
  pageContent: Locator;
  returnButton: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.featureButton = this.page.locator("a#redirect");
    this.pageContent = this.page.locator("div.example > p");
    this.returnButton = this.page.locator("div.example > p > a");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Redirection");
  }

  async clickRedirection() {
    await this.featureButton.click();
    await this.page.waitForLoadState("load");
    await expect(this.pageTitle).toHaveText("Status Codes");
    await this.capture.viewport(DIR.results_folder, "Redirect-Page");
  }

  async validateAllRedirections(expectedCodes: Array<string>) {
    for (let index = 0; index < expectedCodes.length; index++) {
      await this.page.locator(`//a[text()="${expectedCodes[index]}"]`).click();
      await expect(this.pageContent).toContainText(
        `This page returned a ${expectedCodes[index]} status code.`,
      );
      await this.capture.viewport(
        DIR.results_folder,
        `${expectedCodes[index]}-status`,
      );
      await this.returnButton.click();
      await this.page.waitForLoadState("load");
    }
  }
}
