import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

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

  async validateInitialPositions() {
    // const initialPositionA = await this.elementA.boundingBox()
    // const initialPositionB = await this.elementB.boundingBox()
    // expect( initialPositionA ).not.toBe( initialPositionB )
    expect(await this.elementA.innerText()).toBe("A");
    expect(await this.elementB.innerText()).toBe("B");
  }

  async moveElementAToPositionB() {
    await this.elementA.dragTo(this.elementB);
  }

  async validateElementsSwapperd() {
    await this.capture.viewport(DIR.results_folder, "Elements-Swapped");
    expect(await this.elementA.innerText()).toBe("B");
    expect(await this.elementB.innerText()).toBe("A");
  }
}
