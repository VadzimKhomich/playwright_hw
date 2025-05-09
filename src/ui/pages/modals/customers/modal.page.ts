import { expect } from "@playwright/test";
import { SalesPortal } from "ui/pages/sales-portal";


export abstract class Modal extends SalesPortal {
    async waitForClosed() {
        await expect(this.uniqueElement).not.toBeVisible()
    }
}