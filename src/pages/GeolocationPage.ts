import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class GeolocationPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  featureButton: Locator;
  latitude: Locator;
  longitude: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");
    this.featureButton = this.page.locator("#content > div > button");
    this.latitude = this.page.locator("#lat-value");
    this.longitude = this.page.locator("#long-value");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Geolocation");
  }

  async clickPostionButton() {
    expect(await this.featureButton.textContent({ timeout: 3000 })).toBe(
      "Where am I?",
    );
    await this.capture.viewport(DIR.results_folder, "Click-Button");
    await this.featureButton.click();
  }

  async validateGeoCoordinates() {
    await expect(this.latitude).toBeVisible({ timeout: 2000 });
    await expect(this.longitude).toBeVisible();
    await this.capture.viewport(DIR.results_folder, "Geo-Data-Validated");
  }
}
