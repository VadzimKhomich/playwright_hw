import { expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./modals/base.page";
import { logStep } from "utilits/validation/reporter.utils";

export abstract class SalesPortal extends BasePage {
  abstract uniqueElement: Locator;

  readonly spinner = this.page.locator(".spinner-border");
  readonly notification = this.page.locator(".toast-body");
  readonly closeNotificationBtn = this.page.locator("button[aria-label='Close']");

  @logStep("Wait spinner finished")
  async waitForSpinner() {
    await expect(this.spinner).toHaveCount(0);
  }

  @logStep("Page is opened")
  async waitForOpened() {
    await expect(this.uniqueElement).toBeVisible();
    await this.waitForSpinner();
  }

  @logStep("Wait Open Notification")
  async waitForNotification(text: string) {
    await expect(this.notification).toHaveText(text);
  }

  @logStep("CLose Notification")
  async clickCloseNotification() {
    await this.closeNotificationBtn.click();
  }
}
