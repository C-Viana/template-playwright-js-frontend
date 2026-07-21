import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { FileUploadPage } from "../src/pages/FileUploadPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: File Upload", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC18-TC01");
  const home = new HomePage(page, capture);
  const feature = new FileUploadPage(page, capture);

  await home.navigate();
  await home.selectMenu("File Upload");
  expect(await home.getTitle()).toBe(APP.title);

  await feature.validatePage();
  await feature.inputFile(`${process.cwd()}\\README.md`);
  await feature.clickUpload();
  await feature.validateUploadedFile();
});
