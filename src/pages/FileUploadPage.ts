import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR } from "../data/TestData.js";

export class FileUploadPage {
  page: Page;
  capture: ScreenshotHelper;
  expectedFileName: string;
  pageTitle: Locator;
  fileInput: Locator;
  buttonUpload: Locator;
  uploadedFileName: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.expectedFileName = "";
    this.pageTitle = this.page.locator("h3");
    this.fileInput = this.page.locator("#file-upload");
    this.buttonUpload = this.page.locator("#file-submit");
    this.uploadedFileName = this.page.locator("#uploaded-files");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("File Uploader");
  }

  async inputFile(filePath: string) {
    await this.fileInput.setInputFiles(filePath);
    this.expectedFileName = filePath.split("/").slice(-1)[0];
    await this.capture.viewport(DIR.results_folder, "Uploading-File");
  }

  async clickUpload() {
    await this.buttonUpload.click();
  }

  async validateUploadedFile() {
    const fileResult = await this.uploadedFileName.textContent({
      timeout: 5000,
    });
    await this.capture.viewport(DIR.results_folder, "Upload-Finished");
    expect(fileResult?.trim()).toBe(this.expectedFileName);
  }
}
