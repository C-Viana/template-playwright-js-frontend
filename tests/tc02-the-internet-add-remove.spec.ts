import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { AddRemoveElementsPage } from "../src/pages/AddRemoveElementsPage.js";

test("The Internet: Add/Remove One Element", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC02-TC01");
  const home = new HomePage(page, capture);
  const feature = new AddRemoveElementsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Add/Remove Elements");
  await home.validateTitle();
  await feature.validatePage();
  await feature.addElement();
  await feature.removeButtonExists();
  await feature.removeElement();
  await feature.removeButtonNotExists();
});

test("The Internet: Add/Remove Multiple Elements", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC02-TC02");
  const home = new HomePage(page, capture);
  const feature = new AddRemoveElementsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Add/Remove Elements");
  await home.validateTitle();
  await feature.validatePage();

  for (let index = 0; index < 5; index++) {
    await feature.addElement();
  }

  await feature.removeButtonQuantity(5);
  await feature.removeAll();
  await feature.removeButtonNotExists();
});
