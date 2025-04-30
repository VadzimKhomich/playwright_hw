import { Locator } from "@playwright/test";
import { SalesPortal } from "./sales-portal";
import { ModuleName } from "types/home.types";

export class HomePage extends SalesPortal {
    uniqueElement = this.page.locator(".welcome-text")
    customerButton = this.page.getByRole("link", {name: "Customers"})
    ordersButton = this.page.getByRole("link", {name: "Orders"})
    productsButton = this.page.getByRole("link", {name: "Products"})
    managersButton = this.page.getByRole("link", {name: "Managers"})

    async clickModuleButton(moduleName: ModuleName) {
        const moduleNames: Record<ModuleName, Locator> = {
            Customers: this.customerButton,
            Orders: this.ordersButton,
            Products: this.productsButton,
            Managers: this.managersButton
        }
        await moduleNames[moduleName].click()
    }


}