import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { FileDownloadPage } from "../src/pages/FileDownloadPage.js";
import { loadEnvFile } from "node:process";
loadEnvFile(".env");

test.use({
  httpCredentials: {
    username: process.env.AUTH_Basic_username ?? "missing",
    password: process.env.AUTH_Basic_password ?? "missing",
  },
});

test("The Internet: Secure File Download", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC36-TC01");
  const home = new HomePage(page, capture);
  const feature = new FileDownloadPage(page, capture);

  await home.navigate();
  await home.selectMenu("Secure File Download");
  await home.validateTitle();
  await feature.validateSecurePage();
  await feature.selectRandomFile();
  await feature.secureDownloadFile("SC36-TC01", {
    username: "admin",
    password: "admin",
  });
});
