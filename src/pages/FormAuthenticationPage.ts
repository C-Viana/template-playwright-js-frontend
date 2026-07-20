import { expect, Locator, Page } from "@playwright/test";
import { ScreenshotHelper } from "../utils/ScreenshotHelper.js";
import { loadEnvFile } from "node:process";
import { DIR } from "../data/TestData.js";

loadEnvFile(".env");

export class FormAuthenticationPage {
  page: Page;
  capture: ScreenshotHelper;
  pageTitle: Locator;
  inputUsername: Locator;
  inputPassword: Locator;
  buttonLogin: Locator;
  messageSuccess: Locator;
  buttonLogout: Locator;
  data: NodeJS.ProcessEnv = process.env;

  /**
   * @param {import('@playwright/test').Page} page
   * @param {import('../utils/ScreenshotHelper').ScreenshotHelper} capture
   */
  constructor(page: Page, capture: ScreenshotHelper) {
    this.page = page;
    this.capture = capture;
    this.pageTitle = this.page.locator("h2");
    this.inputUsername = this.page.locator("#username");
    this.inputPassword = this.page.locator("#password");
    this.buttonLogin = this.page.locator("button.radius");
    this.messageSuccess = this.page.locator("div#flash");
    this.buttonLogout = this.page.locator("a.button");
  }

  async validatePage() {
    await expect(this.pageTitle).toHaveText("Login Page");
  }

  async setFormData() {
    await this.inputUsername.fill(this.data.AUTH_Form_username ?? "NULL");
    await this.inputPassword.fill(this.data.AUTH_Form_password ?? "NULL");
    await this.capture.viewport(DIR.results_folder, "Data-Set.png");
  }

  async clickLogin() {
    await this.buttonLogin.click();
  }

  async validateLogin() {
    const operationText = await this.messageSuccess.textContent();
    expect(operationText?.trim()).toContain("You logged into a secure area!");
    await this.capture.viewport(DIR.results_folder, "Login-Success.png");
  }

  async clickLogout() {
    await this.buttonLogout.click();
  }

  async validateLogout() {
    await expect(this.buttonLogin).toBeVisible();
    await this.capture.viewport(DIR.results_folder, "Logout-Success.png");
    const operationText = await this.messageSuccess.textContent();
    expect(operationText?.trim()).toContain(
      "You logged out of the secure area!",
    );
  }
}
