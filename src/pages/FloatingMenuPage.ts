import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class FloatingMenuPage {
  page: Page;
  capture: ScreenshotHelper;
  expectedFileName: string;
  pageTitle: Locator;
  menuItemHome: Locator;
  menuItemNews: Locator;
  menuItemContact: Locator;
  menuItemAbout: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.expectedFileName = "";
    this.pageTitle = this.page.locator("h3");
    this.menuItemHome = this.page.locator("#menu > ul > li:nth-child(1)");
    this.menuItemNews = this.page.locator("#menu > ul > li:nth-child(2)");
    this.menuItemContact = this.page.locator("#menu > ul > li:nth-child(3)");
    this.menuItemAbout = this.page.locator("#menu > ul > li:nth-child(4)");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Floating Menu");
  }

  async scrollPageDown() {
    await this.page.mouse.wheel(0, 300);
    await this.capture.viewport(DIR.results_folder, "Scrolled-Down");
  }

  async validateMenu() {
    await this.page.waitForTimeout(2000);
    await this.capture.viewport(DIR.results_folder, "Menu-Enabled");
    await expect(this.menuItemHome).toBeInViewport();
    await expect(this.menuItemNews).toBeInViewport();
    await expect(this.menuItemContact).toBeInViewport();
    await expect(this.menuItemAbout).toBeInViewport();
  }
}
