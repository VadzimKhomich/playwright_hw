import { expect, Locator, Page } from "@playwright/test";

export abstract class SalesPortal {
    spinner: Locator;
    notification: Locator;
    abstract uniqueElement: Locator;
    constructor(protected page: Page) {
        this.spinner = page.locator(".spinner-border")
        this.notification = page.locator(".toast-body")
    }

    async waitForSpinner() {
        await expect(this.spinner).toHaveCount(0)
    }

    async waitForOpened() {
        await expect(this.uniqueElement).toBeVisible()
        await this.waitForSpinner()

    }

    async waitForNotification(text: string) {
        await expect(this.notification).toHaveText(text)
    }
}