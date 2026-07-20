import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class DynamicControlsPage {
  page: Page;
  capture: ScreenshotHelper;
  contextDiv: Locator;
  loading: Locator;
  checkbox: Locator;
  addRemoveButton: Locator;
  operationMessage: Locator;
  input: Locator;
  enableButton: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.contextDiv = this.page.locator("#hot-spot");
    this.loading = this.page.locator('//div[@id="loading"][1]');
    this.checkbox = this.page.locator('input[type="checkbox"]');
    this.addRemoveButton = this.page.locator(
      '#checkbox-example button[type="button"]',
    );
    this.operationMessage = this.page.locator("p#message");
    this.input = this.page.locator('input[type="text"]');
    this.enableButton = this.page.locator(
      '#input-example button[type="button"]',
    );
  }

  async check() {
    await this.checkbox.click();
    expect(await this.checkbox.isChecked()).toBeTruthy();
  }

  async clickRemove() {
    expect(await this.addRemoveButton.innerText()).toBe("Remove");
    await this.addRemoveButton.click();
    await this.capture.viewport(DIR.results_folder, "Removing-Checkbox.png");
  }

  async clickAdd() {
    expect(await this.addRemoveButton.innerText()).toBe("Add");
    await this.addRemoveButton.click();
    await this.capture.viewport(DIR.results_folder, "Removing-Checkbox.png");
  }

  async waitLoading() {
    expect(await this.loading.isVisible()).toBeTruthy();
    await expect(this.loading).toBeHidden({ timeout: 8000 });
  }

  async validateRemoval() {
    await this.capture.viewport(DIR.results_folder, "Validating-Removal.png");
    expect(await this.checkbox.isVisible()).toBeFalsy();
    expect(await this.addRemoveButton.innerText()).toBe("Add");
    expect(await this.operationMessage.innerText()).toBe("It's gone!");
  }

  async validateAddition() {
    await this.capture.viewport(DIR.results_folder, "Validating-Addition.png");
    expect(await this.checkbox.isVisible()).toBeTruthy();
    expect(await this.addRemoveButton.innerText()).toBe("Remove");
    expect(await this.operationMessage.innerText()).toBe("It's back!");
  }

  async fieldIsEnabled(status: boolean) {
    if (status === false) {
      await this.capture.viewport(
        DIR.results_folder,
        "Validating-Component-Disabled.png",
      );
      await expect(this.input).toHaveAttribute("disabled", /.*/);
      expect(await this.enableButton.innerText()).toBe("Enable");
    } else {
      await this.capture.viewport(
        DIR.results_folder,
        "Validating-Component-Enabled.png",
      );
      await expect(this.input).not.toHaveAttribute("disabled", /.*/);
      expect(await this.enableButton.innerText()).toBe("Disable");
    }
  }

  async clickEnable() {
    await this.enableButton.click();
    await this.waitLoading();
    expect(await this.page.locator("p#message").innerText()).toBe(
      "It's enabled!",
    );
  }

  async clickDisable() {
    await this.enableButton.click();
    await this.waitLoading();
    expect(await this.page.locator("p#message").innerText()).toBe(
      "It's disabled!",
    );
  }
}
