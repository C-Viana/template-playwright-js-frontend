import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class DynamicLoadingPage {
  page: Page;
  capture: ScreenshotHelper;
  firstLink: Locator;
  secondLink: Locator;
  loadingElement: Locator;
  hiddenElement: Locator;
  startButton: Locator;
  renderedElement: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.firstLink = this.page.locator('a[href="/dynamic_loading/1"]');
    this.secondLink = this.page.locator('a[href="/dynamic_loading/2"]');
    this.loadingElement = this.page.locator("#loading");
    this.hiddenElement = this.page.locator("#finish");
    this.startButton = this.page.locator("#start>button");
    this.renderedElement = this.page.locator("#finish");
  }

  async clickFirstLink() {
    await this.firstLink.click();
  }

  async clickSecondLink() {
    await this.secondLink.click();
  }

  async clickStart() {
    await this.startButton.click();
  }

  async waitLoading() {
    await expect(this.loadingElement).toBeVisible();
    await expect(this.loadingElement).toBeHidden({ timeout: 10000 });
  }

  async isComponentHidden(status: boolean) {
    if (status === true) {
      await this.capture.viewport(DIR.results_folder, "Element-Hidden");
      await expect(this.hiddenElement).toBeHidden();
    } else {
      await this.capture.viewport(DIR.results_folder, "Element-Visisle");
      await expect(this.hiddenElement).toBeVisible();
      expect(await this.hiddenElement.innerText()).toBe("Hello World!");
    }
  }

  async isRenderedComponentAttached(status: boolean) {
    if (status === true) {
      await this.capture.viewport(DIR.results_folder, "Element-Attached");
      await expect(this.renderedElement).toBeVisible();
      expect(await this.renderedElement.innerText()).toBe("Hello World!");
    } else {
      await this.capture.viewport(DIR.results_folder, "Element-Missing");
      await expect(this.renderedElement).not.toBeAttached();
    }
  }
}
