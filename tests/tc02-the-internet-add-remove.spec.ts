import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { AddRemoveElementsPage } from "../src/pages/AddRemoveElementsPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Add/Remove One Element", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC02-TC01");
  const home = new HomePage(page, capture);
  const feature = new AddRemoveElementsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Add/Remove Elements");
  expect(await home.getTitle()).toBe(APP.title);
  
  await feature.validatePage("Add/Remove Elements");
  await feature.addElement();
  await feature.removeButtonExists();
  await feature.removeElement();
  expect(await feature.removeButtonExists()).toBe(false);
});

test("The Internet: Add/Remove Multiple Elements", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC02-TC02");
  const home = new HomePage(page, capture);
  const feature = new AddRemoveElementsPage(page, capture);

  await home.navigate();
  await home.selectMenu("Add/Remove Elements");
  expect(await home.getTitle()).toBe(APP.title);
  await feature.validatePage("Add/Remove Elements");

  for (let index = 0; index < 5; index++) {
    await feature.addElement();
  }

  expect(await feature.getButtonQuantity()).toBe(5);

  await feature.removeAll();
  expect(await feature.removeButtonExists()).toBe(false);
  expect(await feature.getButtonQuantity()).toBe(0);
});
