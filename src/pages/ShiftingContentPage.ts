import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class ShiftingContentPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  linkList: Locator;
  contentSelector: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.linkList = this.page.locator('//div/a[text()="Example 3: List"]');
    this.contentSelector = this.page.locator("div.example > div.row > div");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Shifting Content");
  }

  async clickList() {
    await this.linkList.click();
    await expect(this.pageTitle).toHaveText(`Shifting Content: List`);
    await this.capture.viewport(DIR.results_folder, "List-Page.png");
  }

  async getContent() {
    return await this.contentSelector.textContent();
  }

  async reload() {
    await this.page.evaluate(() => window.location.reload());
    await this.page.waitForLoadState("load");
    await this.capture.viewport(DIR.results_folder, "Reloaded-Page.png");
  }

  async validateShiftingContent(expectedValues: Array<string>) {
    const listContentRaw = await this.contentSelector.textContent();
    const currentValues = listContentRaw
      ?.split("\n")
      .filter((item) => item.match(new RegExp("[a-zA-Z]+ .+")));
    currentValues?.forEach((line) =>
      expect(expectedValues).toContain(line.trim()),
    );
  }

  validateContentChanged(
    contentBefore: string | null,
    contentAfter: string | null,
  ) {
    if (contentBefore === null || contentAfter === null)
      throw new Error("Values were not expected to be null");
    expect(contentAfter).not.toBe(contentBefore);
  }
}
