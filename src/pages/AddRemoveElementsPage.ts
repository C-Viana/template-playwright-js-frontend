import { expect, Locator, Page } from "@playwright/test";
import { DIR } from "../data/TestData.js";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";

export class AddRemoveElementsPage {
  page: Page;
  capture: ScreenshotHelper;
  buttonAdd: Locator;
  buttonRemove: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.buttonAdd = this.page.locator('//button[contains(text(),"Add")]');
    this.buttonRemove = page.locator('//button[text()="Delete"]');
  }

  async validatePage() {
    await expect(this.page.locator("h3")).toHaveText("Add/Remove Elements");
    await expect(
      this.page.locator('//button[text()="Delete"]'),
    ).not.toBeVisible();
    await this.capture.component(
      this.buttonAdd,
      DIR.results_folder,
      "Button-Add",
    );
  }

  async addElement() {
    await this.buttonAdd.click({ delay: 500 });
  }

  async removeElement() {
    await this.buttonRemove.click({ delay: 500 });
  }

  async removeButtonExists() {
    await expect(this.buttonRemove).toBeVisible();
    await this.capture.component(
      this.buttonRemove,
      DIR.results_folder,
      "Button-Remove",
    );
  }

  /**
   *
   * @param {number} quantity
   */
  async removeButtonQuantity(quantity: number) {
    await this.capture.viewport(DIR.results_folder, "All-Elements");
    expect(await this.buttonRemove.count()).toBe(quantity);
  }

  async removeAll() {
    const allRemoveButtons = await this.buttonRemove.all();
    for (let index = 4; index >= 0; index--) {
      await allRemoveButtons[index].click({ delay: 1000 });
    }
  }

  async removeButtonNotExists() {
    await this.capture.viewport(DIR.results_folder, "Element-Deleted");
    expect(await this.buttonRemove.count()).toBe(0);
    await expect(this.buttonAdd).toBeVisible();
  }
}
