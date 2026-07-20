import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class JavaScriptEventError {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  pageContent: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.pageContent = this.page.locator("body > p");
  }

  async validatePage() {
    await expect(this.page).toHaveTitle("Page with JavaScript errors on load");
  }

  async validatePageError(failureEvent: Promise<Error>) {
    const throwedFailure = await failureEvent;
    expect(throwedFailure.message).toBe(
      "Cannot read properties of undefined (reading 'xyz')",
    );
  }

  async bypassPageError(pageErrors: Array<Error>) {
    await expect(this.pageContent).toHaveText(
      "This page has a JavaScript error in the onload event. This is often a problem to using normal Javascript injection techniques.",
    );
    await this.capture.viewport(DIR.results_folder, "Full-Page.png");

    expect(pageErrors).toHaveLength(0);
  }
}
