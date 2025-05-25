import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./modals/base.page";

export abstract class SalesPortal extends BasePage {
  abstract uniqueElement: Locator;

  readonly spinner = this.page.locator(".spinner-border");
  readonly notification = this.page.locator(".toast-body");
  readonly closeNotificationBtn = this.page.locator("button[aria-label='Close']");

  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0);
  }

  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinner();
  }

  async waitForNotification(text: string) {
    await expect(this.notification).toHaveText(text);
  }
  async clickCloseNotification() {
    await this.closeNotificationBtn.click();
  }
}
