import { Locator } from "@playwright/test";
import { IUser } from "../../types/user.type";
import { SalesPortal } from "./sales-portal";
import { SALES_PORTAL_URL } from "config/environment";

export class LoginPage extends SalesPortal {
    readonly email = this.page.locator("#emailinput")
    readonly password = this.page.locator("#passwordinput")
    readonly loginBtn = this.page.getByRole("button", { name: "Login" })
    readonly uniqueElement = this.loginBtn

    async fillCredentials(user: Partial<IUser>) {
        user.email && (await this.email.fill(user.email))
        user.password && (await this.password.fill(user.password))
    }

    async clickLoginBtn() {
        await this.loginBtn.click()
    }

    async goToSalesPortal() {
        await this.page.goto(SALES_PORTAL_URL)
    }
}