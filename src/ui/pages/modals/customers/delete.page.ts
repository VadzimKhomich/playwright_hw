import { Locator } from "@playwright/test";
import { Modal } from "./modal.page";

export class DeleteModal extends Modal {
    readonly uniqueElement = this.page.locator(".modal-dialog")
    readonly title = this.uniqueElement.locator(".modal-title")
    readonly yesBtn = this.uniqueElement.getByRole("button", {name: "Yes, Delete"})
    readonly cancelBtn = this.uniqueElement.getByRole("button", {name: "Cancel"})
    readonly closeBtn = this.uniqueElement.locator("button[aria-label='Close']")

    async clickYesBtn() {
        await this.yesBtn.click()
    }

    async clickCancelBtn() {
        await this.cancelBtn.click()
    }

    async clickCloselBtn() {
        await this.closeBtn.click()
    }

}