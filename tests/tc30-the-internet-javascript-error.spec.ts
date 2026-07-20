import { test } from "@playwright/test";
import { ScreenshotHelper } from "../src/utils/ScreenshotHelper.js";
import { HomePage } from "../src/pages/HomePage.js";
import { JavaScriptEventError } from "../src/pages/JavaScriptEventError.js";

test("The Internet: JavaScript onload event error - check error", async ({
  page,
}) => {
  const failureEvent = page.waitForEvent("pageerror");

  const capture = new ScreenshotHelper(page, "SC30-TC01");
  const home = new HomePage(page, capture);
  const feature = new JavaScriptEventError(page, capture);

  await home.navigate();
  await home.selectMenu("JavaScript onload event error");
  await feature.validatePage();
  await feature.validatePageError(failureEvent);
});

test("The Internet: JavaScript onload event error - bypass error", async ({
  page,
}) => {
  const pageErrors: Error[] = [];
  page.on("pageerror", (exception) => {
    pageErrors.push(exception);
  });

  await page.addInitScript(() => {
    (
      document as unknown as {
        propertyThatDoesNotExist: Record<string, string>;
      }
    ).propertyThatDoesNotExist = {
      xyz: "Valor mockado para teste",
    };
  });

  const capture = new ScreenshotHelper(page, "SC30-TC02");
  const home = new HomePage(page, capture);
  const feature = new JavaScriptEventError(page, capture);

  await home.navigate();
  await home.selectMenu("JavaScript onload event error");
  await feature.validatePage();
  await feature.bypassPageError(pageErrors);
});
