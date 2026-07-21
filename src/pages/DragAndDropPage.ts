import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";

export class DragAndDropPage {
  page: Page;
  capture: ScreenshotHelper;
  contextDiv: Locator;
  elementA: Locator;
  elementB: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.contextDiv = this.page.locator("#hot-spot");

    this.elementA = this.page.locator("#column-a");
    this.elementB = this.page.locator("#column-b");
  }

  async validateElementsContent(valueElementA: string, valueElementB: string) {
    // const initialPositionA = await this.elementA.boundingBox()
    // const initialPositionB = await this.elementB.boundingBox()
    // expect( initialPositionA ).not.toBe( initialPositionB )
    expect(await this.elementA.innerText()).toBe(valueElementA);
    expect(await this.elementB.innerText()).toBe(valueElementB);
  }

  async moveElementAToPositionB() {
    await this.elementA.dragTo(this.elementB);
  }
}
