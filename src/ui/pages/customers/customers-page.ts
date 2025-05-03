import { expect, Locator } from "@playwright/test";
import { SalesPortal } from "../sales-portal";
import { ICustomer, ICustomerInTable } from "types/customer.types";
import { COUNTRIES } from "data/customers/countries.data";
import { DeleteModal } from "../modals/customers/delete.page";

export class CustomersPage extends SalesPortal {
    readonly deleteModal = new DeleteModal(this.page)
  readonly addCustomerBtn = this.page.getByRole("button", {
    name: "Add Customer",
  });
  readonly uniqueElement = this.addCustomerBtn;
  readonly tableRows = this.page.locator("#table-customers tbody tr");
  readonly tableRowByEmail = (email: string) =>
    this.tableRows.filter({ has: this.page.getByText(email) });
  readonly emailCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(1)");
  readonly nameCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(2)");
  readonly countryCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(3)");
  readonly createdOnCell = (email: string) =>
    this.tableRowByEmail(email).locator("td:nth-child(4)");
  readonly detailsBtn = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Details");
  readonly editBtn = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Edit");
  readonly deleteBtn = (email: string) =>
    this.tableRowByEmail(email).getByTitle("Delete");

  async clickTableAction(
    userEmail: string,
    action: "edit" | "details" | "delete"
  ) {
    const actionButtons = {
      edit: this.editBtn(userEmail),
      delete: this.deleteBtn(userEmail),
      details: this.detailsBtn(userEmail),
    };
    await actionButtons[action].click();
  }

  async addCustomerBntClick() {
    await this.addCustomerBtn.click();
  }

  async getCustomerData(customerEmail: string) {
    const [email, name, country] = await this.tableRowByEmail(customerEmail)
      .locator("td")
      .allInnerTexts();

    return {
      email,
      name,
      country: country as COUNTRIES,
    };
  }

  async getDataTable() {
    const tableData: Array<ICustomerInTable> = [];
    const rows = await this.tableRows.all();
    for (const row of rows) {
      const [email, name, country] = await row.locator("td").allInnerTexts();
      tableData.push({
        email,
        name,
        country: country as COUNTRIES,
      });
    }
    return tableData
  }
}
