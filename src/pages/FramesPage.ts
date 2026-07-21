import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class FramesPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  linkNestedFrames: Locator;
  topFrame: Locator;
  leftFrameContent: Locator;
  middleFrameContent: Locator;
  rightFrameContent: Locator;
  bottomFrameContent: Locator;
  linkIframe: Locator;
  closeButton: Locator;
  iframeTextAreaContent: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.pageTitle = this.page.locator("h3");

    this.linkNestedFrames = this.page.locator('//a[text()="Nested Frames"]');
    this.topFrame = this.page
      .frameLocator('frame[name="frame-top"]')
      .locator("frameset");
    this.leftFrameContent = this.topFrame
      .frameLocator('frame[name="frame-left"]')
      .locator("body");
    this.middleFrameContent = this.topFrame
      .frameLocator('frame[name="frame-middle"]')
      .locator("body");
    this.rightFrameContent = this.topFrame
      .frameLocator('frame[name="frame-right"]')
      .locator("body");
    this.bottomFrameContent = this.page
      .frameLocator('frame[name="frame-bottom"]')
      .locator("body");

    this.linkIframe = this.page.locator('//a[text()="iFrame"]');
    this.closeButton = this.page.locator("button.tox-notification__dismiss");
    this.iframeTextAreaContent = this.page
      .frameLocator("iframe.tox-edit-area__iframe")
      .locator("body > p");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Frames");
  }

  async clickNestedFrames() {
    await this.linkNestedFrames.click();
  }

  async validateAllFrames() {
    await expect(this.topFrame).toBeVisible();
    await this.capture.component(
      this.topFrame,
      DIR.results_folder,
      "Top-Frame-Visible",
    );

    const left = (await this.leftFrameContent.textContent()) ?? "";
    const middle = (await this.middleFrameContent.textContent()) ?? "";
    const right = (await this.rightFrameContent.textContent()) ?? "";
    const bottom = (await this.bottomFrameContent.textContent()) ?? "";

    expect(left.trim()).toBe("LEFT");
    expect(middle.trim()).toBe("MIDDLE");
    expect(right.trim()).toBe("RIGHT");
    expect(bottom.trim()).toBe("BOTTOM");
    await this.capture.component(
      this.topFrame,
      DIR.results_folder,
      "Bottom-Frame-Visible",
    );
    //await this.capture.viewport(DIR.results_folder, 'Validating-Frames')
  }

  async clickIFrame() {
    await this.linkIframe.click();
  }

  async closeModal() {
    await expect(this.pageTitle).toHaveText(
      "An iFrame containing the TinyMCE WYSIWYG Editor",
    );
    if (await this.closeButton.isVisible()) {
      await this.closeButton.click();
    }
    await this.capture.viewport(DIR.results_folder, "Iframe-Screen");
  }

  async validateIFrameInputArea() {
    const iframeTextAreaContent =
      await this.iframeTextAreaContent.textContent();
    await this.capture.viewport(DIR.results_folder, "Validating-Iframe");
    expect(iframeTextAreaContent).toBe("Your content goes here.");
  }
}
