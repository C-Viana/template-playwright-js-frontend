import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class DisappearingElementsPage {
  page: Page;
  capture: ScreenshotHelper;
  contextDiv: Locator;
  menuItemLocator: Locator;
  expectedItems: Array<string> = [
    "Home",
    "About",
    "Contact Us",
    "Portfolio",
    "Gallery",
  ];

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.contextDiv = this.page.locator("#hot-spot");
    this.menuItemLocator = this.page.locator("ul>li>a");
  }

  async validateMenu() {
    const maxReps = 5;
    let testControl = 0;
    let menuItems = await this.menuItemLocator.all();

    while (
      this.expectedItems.length > menuItems.length &&
      testControl < maxReps
    ) {
      await this.page.reload({ waitUntil: "load" });
      menuItems = await this.menuItemLocator.all();
      testControl++;
    }

    await this.capture.viewport(DIR.results_folder, "Reloaded-Page.png");
    if (testControl == maxReps)
      throw new Error(
        `Menu item was not present after ${maxReps} attemps reloading the page`,
      );

    menuItems.forEach(async (item) => {
      expect(this.expectedItems).toContain(await item.textContent());
    });
  }
}
