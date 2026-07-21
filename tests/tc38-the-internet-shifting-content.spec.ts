import { expect, test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { ShiftingContentPage } from "../src/pages/ShiftingContentPage.js";
import { APP } from "../src/data/TestData.js";

test("The Internet: Shifting Content - List", async ({ page }) => {
  const capture = new ScreenshotHelper(page, "SC38-TC01");
  const home = new HomePage(page, capture);
  const feature = new ShiftingContentPage(page, capture);

  const expectedValues = [
    "Et numquam et aliquam.",
    "Important Information You're Looking For",
    "Nesciunt autem eum odit fuga tempora deleniti.",
    "Vel aliquid dolores veniam enim nesciunt libero quaerat.",
    "Sed deleniti blanditiis odio laudantium.",
  ];

  await home.navigate();
  await home.selectMenu("Shifting Content");
  expect(await home.getTitle()).toBe(APP.title);

  await feature.validatePage();
  await feature.clickList();
  const contentBefore = await feature.getContent();
  await feature.validateShiftingContent(expectedValues);
  await feature.reload();
  const contentAfter = await feature.getContent();
  await feature.validateShiftingContent(expectedValues);
  feature.validateContentChanged(contentBefore, contentAfter);
});
