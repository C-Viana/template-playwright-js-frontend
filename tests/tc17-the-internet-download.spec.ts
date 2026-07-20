import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { FileDownloadPage } from "../src/pages/FileDownloadPage.js";

test("The Internet: File Download", async ({ page }) => {
  const folderName = "SC17-TC01";
  const capture = new ScreenshotHelper(page, folderName);
  const home = new HomePage(page, capture);
  const feature = new FileDownloadPage(page, capture);

  await home.navigate();
  await home.selectMenu("File Download");
  await home.validateTitle();
  await feature.validatePage();
  await feature.selectRandomFile();
  await feature.downloadFile(folderName);
});
