import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class DynamicContentPage {
  page: Page;
  capture: ScreenshotHelper;
  contextDiv: Locator;
  avatarLocators: Locator;
  imageSources: Array<string> = [
    "/img/avatars/Original-Facebook-Geek-Profile-Avatar-1.jpg",
    "/img/avatars/Original-Facebook-Geek-Profile-Avatar-2.jpg",
    "/img/avatars/Original-Facebook-Geek-Profile-Avatar-3.jpg",
    "/img/avatars/Original-Facebook-Geek-Profile-Avatar-4.jpg",
    "/img/avatars/Original-Facebook-Geek-Profile-Avatar-5.jpg",
    "/img/avatars/Original-Facebook-Geek-Profile-Avatar-6.jpg",
    "/img/avatars/Original-Facebook-Geek-Profile-Avatar-7.jpg",
  ];

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.contextDiv = this.page.locator("#hot-spot");
    this.avatarLocators = this.page.locator("#content img");
  }

  async validateDynamicImages() {
    const images = await this.avatarLocators.all();
    for (let index = 0; index < images.length; index++) {
      await this.capture.component(
        images[index],
        DIR.results_folder,
        `avatar-img-${index}`,
      );
      expect(this.imageSources).toContain(
        await images[index].getAttribute("src"),
      );
    }
  }
}
