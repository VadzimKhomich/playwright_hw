import { Locator } from "@playwright/test";

import { SalesPortal } from "./sales-portal";
import { SALES_PORTAL_URL } from "config/environment";
import { ICredentials } from "types/user.type";
import { logStep } from "utilits/validation/reporter.utils";

export class LoginPage extends SalesPortal {
    readonly email = this.page.locator("#emailinput")
    readonly password = this.page.locator("#passwordinput")
    readonly loginBtn = this.page.getByRole("button", { name: "Login" })
    readonly uniqueElement = this.loginBtn

    @logStep("Fill Credentials")
    async fillCredentials(user: Partial<ICredentials>) {
        user.username && (await this.email.fill(user.username))
        user.password && (await this.password.fill(user.password))
    }
    
    @logStep("Click login button")
    async clickLoginBtn() {
        await this.loginBtn.click()
    }

    @logStep("Open Sales Portal")
    async goToSalesPortal() {
        await this.page.goto(SALES_PORTAL_URL)
    }
}