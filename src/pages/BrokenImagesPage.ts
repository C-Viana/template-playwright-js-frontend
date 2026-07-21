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

  async getAllImages(): Promise<Locator[]> {
    return await this.imageLocator.all();
  }

  async getImageQuantity(): Promise<number> {
    return await this.imageLocator.count();
  }

  /**
   *
   * @param {import('@playwright/test').Locator} imgLocator
   * @param {string} expectedStatusCode
   */
  async validateImageStatus(imgLocator: Locator, expectedStatusCode: number) {
    await imgLocator.waitFor({state: "visible", timeout: 5000});
    const fileName = await imgLocator.getAttribute("src");
    await this.capture.component(
      imgLocator,
      `${DIR.results_folder}`,
      `image-component-${expectedStatusCode}`,
    );
    get(`https://the-internet.herokuapp.com/img/${fileName}`).then((response) =>
      expect(response.status).toBe(expectedStatusCode),
    );
  }
}
