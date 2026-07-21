import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class ContextMenuPage {
  page: Page;
  capture: ScreenshotHelper;
  contextDiv: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.contextDiv = this.page.locator("#hot-spot");

    this.page.on("dialog", async (dialog) => {
      const bodyMessage = dialog.message();
      expect(bodyMessage).toBe("You selected a context menu");
      await dialog.accept();
    });
  }

  async validateContextComponent() {
    expect(await this.contextDiv.getAttribute("oncontextmenu")).toBe(
      "displayMessage()",
    );
    this.capture.component(
      this.contextDiv,
      DIR.results_folder,
      "Context-Component",
    );
  }

  async openContextMenu() {
    await this.contextDiv.click({ button: "right", delay: 1000 });
  }
}
