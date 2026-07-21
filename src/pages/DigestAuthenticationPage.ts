import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class DigestAuthenticationPage {
  page: Page;
  capture: ScreenshotHelper;
  contextDiv: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.contextDiv = this.page.locator("#hot-spot");
  }

  async validateAccess() {
    await expect(this.page.locator("h3")).toHaveText("Digest Auth");
    await expect(this.page.locator("p")).toContainText(
      "Congratulations! You must have the proper credentials.",
    );
    await this.capture.viewport(
      DIR.results_folder,
      "Authentication-Success",
    );
  }
}
