import { expect, Page } from "@playwright/test";
import { DIR } from "../data/TestData.js";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";

export class ABTestingVariationPage {
  page: Page;
  capture: ScreenshotHelper;

  /**
   *
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
  }

  async validatePage() {
    const pageTitle = await this.page.locator("h3").textContent();
    expect(pageTitle).toMatch(
      new RegExp("A/B Test Control|A/B Test Variation \\d"),
    );

    await this.capture.fullpage(
      `${DIR.results_folder}`,
      `Feature-Validation.png`,
    );

    const pageText = await this.page.locator("p").textContent();
    expect(pageText).toContain("Also known as split testing");
  }
}
