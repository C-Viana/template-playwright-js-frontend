import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { DragAndDropPage } from "../src/pages/DragAndDropPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Drag and Drop", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC10-TC01");
  const home = new HomePage(page, capture);
  const feature = new DragAndDropPage(page, capture);

  await home.navigate();
  await home.selectMenu("Drag and Drop");
  expect(await home.getTitle()).toBe(APP.title);

  await feature.validateElementsContent("A", "B");
  await feature.moveElementAToPositionB();
  await feature.validateElementsContent("B", "A");
});
