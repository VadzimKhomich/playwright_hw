
import { SalesPortal } from "../sales-portal";

export class ProductsPage extends SalesPortal {
    readonly addProductButton = this.page.getByRole("button", {name: "Add Product"})
    readonly uniqueElement = this.addProductButton
    //table
    readonly tableRow = this.page.locator("#table-products tbody tr")
    readonly tableRowByUserName = (userName: string) => this.tableRow.filter({has: this.page.getByText(userName)})
    readonly editBtn = (userName: string) => this.tableRowByUserName(userName).getByTitle("Edit")
    readonly detailsBtn = (userName: string) => this.tableRowByUserName(userName).getByTitle("Details")
    readonly deleteBtn = (userName: string) => this.tableRowByUserName(userName).getByTitle("Delete")

    async clickAddProduct() {
        await this.addProductButton.click()
    }

    async clicProductTableAction(userName: string, action: "edit" | "details" | "delete") {
        const actionButtons = {
            edit: this.editBtn(userName),
            details: this.detailsBtn(userName),
            delete: this.deleteBtn(userName)
        }
        await actionButtons[action].click()
    }
}