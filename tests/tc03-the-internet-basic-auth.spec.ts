import { test, expect } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { loadEnvFile } from "node:process";
import { APP } from "../src/data/TestData.js";
loadEnvFile(".env");

const PAGE_TITLE = "Basic Auth";

test.use({
  httpCredentials: {
    username: process.env.AUTH_Basic_username ?? "missing",
    password: process.env.AUTH_Basic_password ?? "missing",
  },
});

test("The Internet: Basic Auth with valid credentials", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC03-TC01");
  const home = new HomePage(page, capture);

  await home.navigate();
  await home.selectMenu("Basic Auth");
  expect(await home.getTitle()).toBe(APP.title);

  await expect(page.locator("h3")).toHaveText(PAGE_TITLE);
});

test("The Internet: Basic Auth with invalid credentials", async ({
  browser,
}) => {
  const context1 = await browser.newContext({
    httpCredentials: {
      username: "user1",
      password: "password1",
    },
  });
  const page = await context1.newPage();

  const capture = new ScreenshotHelper(page, "SC03-TC02");
  const home = new HomePage(page, capture);

  await home.navigate();
  await home.selectMenu("Basic Auth");

  await expect(page.locator("body")).toContainText("Not authorized");
});
