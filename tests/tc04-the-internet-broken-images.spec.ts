import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { BrokenImagesPage } from "../src/pages/BrokenImagesPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Broken Images", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC04-TC01");
  const home = new HomePage(page, capture);
  const feature = new BrokenImagesPage(page, capture);

  await home.navigate();
  await home.selectMenu("Broken Images");
  expect(await home.getTitle()).toBe(APP.title);

  expect(await feature.getImageQuantity()).toBe(3);

  const images = await feature.getAllImages();
  await feature.validateImageStatus(images[0], 404);
  await feature.validateImageStatus(images[1], 404);
  await feature.validateImageStatus(images[2], 200);
});
