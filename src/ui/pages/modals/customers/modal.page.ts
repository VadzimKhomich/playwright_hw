import { expect } from "@playwright/test";
import { SalesPortal } from "ui/pages/sales-portal";
import { logStep } from "utilits/validation/reporter.utils";


export abstract class Modal extends SalesPortal {

    @logStep("Wait not to be visible for element")
    async waitForClosed() {
        await expect(this.uniqueElement).not.toBeVisible()
    }
}