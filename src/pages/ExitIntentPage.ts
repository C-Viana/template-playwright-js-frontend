import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class ExitIntentPage {
  page: Page;
  capture: ScreenshotHelper;
  modalTitle: Locator;
  modalBody: Locator;
  modalButton: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.modalTitle = this.page.locator("div.modal > div.modal-title");
    this.modalBody = this.page.locator("div.modal > div.modal-body > p");
    this.modalButton = this.page.locator("div.modal > div.modal-footer > p");
  }

  async moveMouseOutside() {
    await this.page.mouse.move(-1, 0);
  }

  async waitModal() {
    await expect(this.modalTitle).toBeVisible({ timeout: 5000 });
    await this.capture.viewport(DIR.results_folder, "Modal-Validated");
  }

  async validateModal() {
    expect(await this.modalTitle.innerText()).toBe("THIS IS A MODAL WINDOW");
    expect(await this.modalBody.innerText()).toBe(
      "It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something).",
    );
    expect(await this.modalButton.innerText()).toBe("Close");
  }

  async closeModal() {
    await this.modalButton.click();
    await expect(this.modalTitle).toBeHidden({ timeout: 2000 });
    await this.capture.viewport(DIR.results_folder, "Modal-Closed");
  }
}
