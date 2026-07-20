import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { BrokenImagesPage } from "../src/pages/BrokenImagesPage.js";

test("The Internet: Broken Images", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC04-TC01");
  const home = new HomePage(page, capture);
  const feature = new BrokenImagesPage(page, capture);

  await home.navigate();
  await home.selectMenu("Broken Images");
  await home.validateTitle();

  await feature.validateImageQuantity(3);
  const images = await feature.getAllImages();
  await feature.validateImageStatus(images[0], "404");
  await feature.validateImageStatus(images[1], "404");
  await feature.validateImageStatus(images[2], "200");
});
