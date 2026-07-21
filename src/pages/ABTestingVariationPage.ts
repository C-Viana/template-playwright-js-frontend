import { Page } from "@playwright/test";
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

  async getPageTitle(): Promise<string | null> {
    await this.capture.viewport(
      `${DIR.results_folder}`,
      `Feature-Validation`,
    );
    return await this.page.locator("h3").textContent();
  }

  async getBodyContent(): Promise<string | null> {
    await this.capture.component(this.page.locator("p"), DIR.results_folder, "Page-Content")
    return await this.page.locator("p").textContent();
  }
}
