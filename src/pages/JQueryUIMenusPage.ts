import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class JQueryUIMenusPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  level1Menu: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.level1Menu = this.page.locator("#menu > li.ui-state-active");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("JQueryUI - Menu");
  }

  /**
   *
   * @param {import('@playwright/test').Locator} menuItem
   */
  async hoverItem(menuItem: Locator) {
    await menuItem.hover();
    await this.capture.viewport(DIR.results_folder, "Item-Validated.png");
  }

  async validateMenuItems() {
    const level1MenuItems = await this.level1Menu.all();

    for (let index = 0; index < level1MenuItems.length; index++) {
      if (
        (await level1MenuItems[index].getAttribute("aria-disabled")) === "true"
      ) {
        await this.hoverItem(level1MenuItems[index]);
        continue;
      }

      const level2MenuItems = await level1MenuItems[index]
        .locator("ul > li")
        .all();
      for (let index = 0; index < level2MenuItems.length; index++) {
        await level2MenuItems[index].hover();
        if (
          (await level2MenuItems[index].locator("ul > li").all()).length < 1
        ) {
          await this.hoverItem(level1MenuItems[index]);
          continue;
        }
        const level3MenuItems = await level2MenuItems[index]
          .locator("ul > li")
          .all();
        level3MenuItems.forEach(async (el) => {
          await this.hoverItem(el);
        });
      }
    }
  }
}
