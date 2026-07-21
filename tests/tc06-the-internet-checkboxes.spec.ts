import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { CheckboxesPage } from "../src/pages/CheckboxesPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Checkboxes", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC06-TC01");
  const home = new HomePage(page, capture);
  const feature = new CheckboxesPage(page, capture);

  await home.navigate();
  await home.selectMenu("Checkboxes");
  expect(await home.getTitle()).toBe(APP.title);
  const checkboxLocators = await feature.getCheckboxes();

  await feature.isChecked(checkboxLocators[0], false);
  await feature.check(checkboxLocators[0]);
  await feature.isChecked(checkboxLocators[0], true);

  await feature.isChecked(checkboxLocators[1], true);
  await feature.check(checkboxLocators[1]);
  await feature.isChecked(checkboxLocators[1], false);
});
