import { expect, Locator, Page } from "@playwright/test";
import { get } from "../utils/HttpServices.js";
import { DIR } from "../data/TestData.js";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";

export class BrokenImagesPage {
  page: Page;
  capture: ScreenshotHelper;
  imageLocator: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.imageLocator = this.page.locator("#content img");
  }

  async getAllImages() {
    return await this.imageLocator.all();
  }

  /**
   *
   * @param {number} expected
   */
  async validateImageQuantity(expected: number) {
    expect(await this.imageLocator.count()).toBe(expected);
  }

  /**
   *
   * @param {import('@playwright/test').Locator} imgLocator
   * @param {string} expectedStatusCode
   */
  async validateImageStatus(imgLocator: Locator, expectedStatusCode: number) {
    await this.capture.component(
      imgLocator,
      `${DIR.results_folder}`,
      `image-component-${expectedStatusCode}`,
    );
    const fileName = await imgLocator.getAttribute("src");
    get(`https://the-internet.herokuapp.com/img/${fileName}`).then((response) =>
      expect(response.status).toBe(expectedStatusCode),
    );
  }
}
