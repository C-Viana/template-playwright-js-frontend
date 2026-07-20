import { expect, Locator, Page } from "@playwright/test";
import { readCanvasContent } from "../utils/ImageHelper.js";
import { DIR } from "../data/TestData.js";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";

export class ChallengingDomPage {
  page: Page;
  capture: ScreenshotHelper;
  buttonLocator: Locator;
  canvasLocator: Locator;
  btnTexts: Array<string> = ["qux", "baz", "bar", "foo"];
  colors = {
    blue: "rgb(43, 166, 203)",
    green: "rgb(93, 164, 35)",
    red: ["rgb(161, 12, 15)", "rgb(163, 12, 15)", "rgb(198, 15, 19)"],
  };

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;

    //----Page Objects----//
    this.buttonLocator = this.page.locator("a.button");
    this.canvasLocator = this.page.locator("canvas#canvas");
  }

  async getButtons() {
    return await this.buttonLocator.all();
  }

  /**
   *
   * @param {import('@playwright/test').Locator} locator
   * @param {string} color
   */
  async validateButton(locator: Locator, color: string) {
    await this.capture.component(
      locator,
      `${DIR.results_folder}`,
      `button-${color}.png`,
    );
    expect(this.btnTexts.includes(await locator.innerText())).toBeTruthy();

    if (color === "red") {
      expect(
        this.colors.red.includes(
          await locator.evaluate((el) => {
            return window
              .getComputedStyle(el)
              .getPropertyValue("background-color");
          }),
        ),
      );
    } else {
      const prop = color as keyof typeof this.colors;
      expect(
        await locator.evaluate((el) => {
          return window
            .getComputedStyle(el)
            .getPropertyValue("background-color");
        }),
      ).toBe(this.colors[prop]);
    }
  }

  async getCanvas() {
    return await this.canvasLocator.evaluate((canvas: HTMLCanvasElement) => {
      return canvas.toDataURL("image/png");
    });
  }

  /**
   *
   * @param {string} regexPattern
   */
  async validateCanvasContentPattern(regexPattern: string) {
    const elementDataUrl = await this.getCanvas();
    const currentContent = await readCanvasContent(elementDataUrl);
    await this.capture.component(
      this.canvasLocator,
      `${DIR.results_folder}`,
      `canvas.png`,
    );
    expect(currentContent).toContain("Answer:");
    expect(currentContent).toMatch(new RegExp(regexPattern));
  }
}
