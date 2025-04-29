import { expect, Locator } from "@playwright/test";
import { SalesPortal } from "../sales-portal";
import { ICustomer } from "types/customer.types";

export class CustomersPage extends SalesPortal {
    addCustomerBtn = this.page.getByRole("button", { name: "Add Customer" })
    uniqueElement = this.addCustomerBtn


    async addCustomerBntClick() {
        await this.addCustomerBtn.click()
    }

    async createdCustomerData() {
        const table = this.page.locator(".table")
        const headers = await table.locator("thead th").allInnerTexts()
        const row = await table.locator("tbody tr:nth-child(1) td").allInnerTexts();
        const rowResulrData = row.slice(0, 3)

        const createdCustomer = rowResulrData.reduce((result, cell, index) => {
            result[headers[index]] = cell
            return result
        }, {} as Record<string, string>)
        return createdCustomer
    }

    async checkCreatedCustomer(customer: ICustomer) {
        const table = this.page.locator(".table")
        const headers = await table.locator("thead th").allInnerTexts()
        const createdCustomer = await this.createdCustomerData()
        expect(createdCustomer).toMatchObject({
            [headers[0]]: customer.email,
            [headers[1]]: customer.name,
            [headers[2]]: customer.country
        })
    }
}