
import { logStep } from "utilits/validation/reporter.utils";
import { SalesPortal } from "../sales-portal";

export class ProductsPage extends SalesPortal {
    readonly addProductButton = this.page.getByRole("button", {name: "Add Product"})
    readonly uniqueElement = this.addProductButton
    //table
    readonly tableRow = this.page.locator("#table-products tbody tr")
    readonly tableRowByProductName = (productName: string) => this.tableRow.filter({has: this.page.getByText(productName)})
    readonly editBtn = (productName: string) => this.tableRowByProductName(productName).getByTitle("Edit")
    readonly detailsBtn = (productName: string) => this.tableRowByProductName(productName).getByTitle("Details")
    readonly deleteBtn = (productName: string) => this.tableRowByProductName(productName).getByTitle("Delete")

    @logStep("Click add Product button")
    async clickAddProduct() {
        await this.addProductButton.click()
    }

    @logStep("Click action button")
    async clicProductTableAction(productName: string, action: "edit" | "details" | "delete") {
        const actionButtons = {
            edit: this.editBtn(productName),
            details: this.detailsBtn(productName),
            delete: this.deleteBtn(productName)
        }
        await actionButtons[action].click()
    }
}