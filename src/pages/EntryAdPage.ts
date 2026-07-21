import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class EntryAdPage {
  page: Page;
  capture: ScreenshotHelper;
  modalTitle: Locator;
  modalBody: Locator;
  modalButton: Locator;
  pageTitle: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.modalTitle = this.page.locator("#modal div.modal-title");
    this.modalBody = this.page.locator("#modal div.modal-body > p");
    this.modalButton = this.page.locator("#modal div.modal-footer > p");
    this.pageTitle = this.page.locator("#content > div > h3");
  }

  async validateModalComponent() {
    await expect(this.modalTitle).toBeVisible({ timeout: 5000 });
    await this.capture.viewport(DIR.results_folder, "Modal-Validated");
    expect(await this.modalTitle.innerText()).toBe("THIS IS A MODAL WINDOW");
    expect(await this.modalBody.innerText()).toBe(
      "It's commonly used to encourage a user to take an action (e.g., give their e-mail address to sign up for something or disable their ad blocker).",
    );
    expect(await this.modalButton.innerText()).toBe("Close");
  }

  async clickModalButton() {
    await this.modalButton.click();
    await expect(this.modalTitle).toBeHidden({ timeout: 2000 });
  }

  async validateModalIsHidden() {
    await expect(this.modalTitle).toBeHidden({ timeout: 2000 });
    await expect(this.pageTitle).toHaveText("Entry Ad");
    await this.capture.viewport(DIR.results_folder, "Modal-Closed");
  }
}
