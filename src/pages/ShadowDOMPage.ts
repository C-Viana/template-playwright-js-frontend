import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class ShadowDOMPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  pageContentSpan: Locator;
  pageContentListItem: Locator;
  shadowRootElement: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h1");
    this.pageContentSpan = this.page.locator('span[slot="my-text"]');
    this.pageContentListItem = this.page.locator(
      'ul[slot="my-text"] > li:nth-child(1)',
    );
    this.shadowRootElement = this.page.locator('p > slot[name="my-text"]');
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Simple template");
  }

  async validatePageContent() {
    await expect(this.pageContentSpan).toHaveText(
      "Let's have some different text!",
    );
    await this.capture.component(
      this.pageContentSpan,
      DIR.results_folder,
      "Span-Content.png",
    );
    await expect(this.pageContentListItem).toHaveText(
      "Let's have some different text!",
    );
    await this.capture.component(
      this.pageContentListItem,
      DIR.results_folder,
      "List-Content.png",
    );
  }

  async validateShadowDomContent() {
    const shadowRootElements = await this.shadowRootElement.all();
    expect(shadowRootElements.length).toBe(2);
    await this.capture.viewport(DIR.results_folder, "Shadow-DOM-Validated.png");
    await expect(shadowRootElements[0]).toHaveText("My default text");
    await expect(shadowRootElements[1]).toHaveText("My default text");
  }
}
