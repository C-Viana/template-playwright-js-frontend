import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { DIR, URL } from "../data/TestData.js";
import { download, downloadWithBasicAuth } from "../utils/HttpServices";

export class FileDownloadPage {
  page: Page;
  capture: ScreenshotHelper;
  fileName: string;
  fileUrl: string;
  pageTitle: Locator;
  filesList: Locator;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    this.fileName = "";
    this.fileUrl = "";
    this.pageTitle = this.page.locator("div.example > h3");
    this.filesList = this.page.locator("#content > div > a");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("File Downloader");
  }

  async validateSecurePage() {
    await expect(this.pageTitle).toHaveText("Secure File Downloader");
  }

  async selectRandomFile() {
    const filesList = await this.filesList.all();
    expect(filesList.length).toBeGreaterThan(0);
    const fileIndex = Math.floor(Math.random() * filesList.length);
    this.fileName = await filesList[fileIndex].innerText();
    this.fileUrl = `${URL.prod}${await filesList[fileIndex].getAttribute("href")}`;
  }

  async downloadFile(folderName: string) {
    await download(
      this.fileUrl,
      this.fileName,
      `${DIR.results_folder}/${folderName}/`,
    );
  }

  async secureDownloadFile(
    folderName: string,
    credentials: { username: string; password: string },
  ) {
    await downloadWithBasicAuth(
      this.fileUrl,
      this.fileName,
      `${DIR.results_folder}/${folderName}/`,
      credentials,
    );
  }
}
