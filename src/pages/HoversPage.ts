import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class HoversPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  figure: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.figure = this.page.locator("div.figure");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Hovers");
  }

  async validateAllFigures() {
    const allProfiles = await this.figure.all();

    for (let index = 0; index < allProfiles.length; index++) {
      const username = allProfiles[index].locator("div.figcaption > h5");
      await expect(username).not.toBeVisible();

      await allProfiles[index].hover();
      await this.capture.component(
        allProfiles[index],
        DIR.results_folder,
        "Validating-Element.png",
      );
      await expect(username).toBeVisible();
    }
  }
}
