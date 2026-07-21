import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { DigestAuthenticationPage } from "../src/pages/DigestAuthenticationPage.js";
import { loadEnvFile } from "node:process";

loadEnvFile(".env");

test.use({
  httpCredentials: {
    username: process.env.AUTH_Basic_username ?? "missing",
    password: process.env.AUTH_Basic_password ?? "missing",
  },
});

test("The Internet: Digest Authentication", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC08-TC01");
  const home = new HomePage(page, capture);
  const feature = new DigestAuthenticationPage(page, capture);

  await home.navigate();
  await home.selectMenu("Digest Authentication");

  await feature.validateAccess();
});
