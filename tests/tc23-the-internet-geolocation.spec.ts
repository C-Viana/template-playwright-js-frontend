import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { GeolocationPage } from "../src/pages/GeolocationPage.js";
import data from "../src/data/TestData.json" with { type: "json" };
import { APP } from "../src/data/TestData.js";

test("The Internet: Geolocation", async ({ page, context }) => {
  await context.grantPermissions(["geolocation"], { origin: data.URL.prod });
  await context.setGeolocation({ latitude: 40.7128, longitude: -74.006 });

  const capture = new ScreenshotHelper(page, "SC23-TC01");
  const home = new HomePage(page, capture);
  const feature = new GeolocationPage(page, capture);

  await home.navigate();
  await home.selectMenu("Geolocation");
  expect(await home.getTitle()).toBe(APP.title);

  await feature.validatePage();
  await feature.clickPostionButton();
  await feature.validateGeoCoordinates();
});
