import { Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { URL, DIR } from "../data/TestData.js";

export class HomePage {
  page: Page;
  capture: ScreenshotHelper;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
  }

  async navigate() {
    await this.page.goto(URL.prod);
    await this.capture.fullpage(`${DIR.results_folder}`, `Home-Page`);
  }

  async selectMenu(menuItemText: string) {
    await this.page.getByRole('link', { name: menuItemText, exact: true }).click();
    await this.page.waitForLoadState("load");
    await this.capture.fullpage(`${DIR.results_folder}`, `Feature-Page`);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }
}
