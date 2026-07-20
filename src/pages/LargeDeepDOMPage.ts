import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";
import { isInViewport, Viewport } from "../utils/PageHelper";

export class LargeDeepDOMPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  targetSibling: Locator;
  targetCellValue: Locator;
  viewport: Viewport | undefined;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.targetSibling = this.page.locator('//div[@id="sibling-50.3"]');
    this.targetCellValue = this.page.locator(
      '//tr[@class="row-50"]/td[@class="column-50"]',
    );
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Large & Deep DOM");
    this.viewport = await this.page.evaluate(() => ({
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight,
    }));
  }

  /**
   *
   * @param {import('@playwright/test').Locator} element
   * @param {number} xPixelsStep
   * @param {number} yPixelsStep
   */
  async scrollToView(
    element: Locator,
    xPixelsStep: number,
    yPixelsStep: number,
  ) {
    let loopControl = 0;
    if (this.viewport === undefined)
      throw new Error("Viewport dimensions are not initialized. ");
    while (
      (await isInViewport(element, this.viewport)) === false &&
      loopControl < 10
    ) {
      await this.page.evaluate(({ x, y }) => window.scrollBy(x, y), {
        x: xPixelsStep,
        y: yPixelsStep,
      });
      await this.page.waitForTimeout(500);
      loopControl++;
    }
  }

  /**
   *
   * @param {number} xPixelsStep
   * @param {number} yPixelsStep
   */
  async validateSiblingElement(xPixelsStep: number, yPixelsStep: number) {
    await this.scrollToView(this.targetSibling, xPixelsStep, yPixelsStep);
    await this.targetSibling.highlight({
      style: "width: 32px; border: solid 2px green;",
    });
    await expect(this.targetSibling).toBeInViewport();
    await this.capture.viewport(DIR.results_folder, "Found-Sibling.png");
    await this.targetSibling.hideHighlight();
  }

  /**
   *
   * @param {number} xPixelsStep
   * @param {number} yPixelsStep
   */
  async validateTableElement(xPixelsStep: number, yPixelsStep: number) {
    await this.scrollToView(this.targetCellValue, xPixelsStep, yPixelsStep);
    await this.targetCellValue.highlight({ style: "border: solid 2px green;" });
    await expect(this.targetCellValue).toBeInViewport();
    await this.capture.viewport(DIR.results_folder, "Found-Cell.png");
    await this.targetCellValue.hideHighlight();
  }
}
