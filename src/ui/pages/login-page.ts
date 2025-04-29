import { Locator } from "@playwright/test";
import { IUser } from "../../types/user.type";
import { SalesPortal } from "./sales-portal";

export class LoginPage extends SalesPortal {
    email = this.page.locator("#emailinput")
    password = this.page.locator("#passwordinput")
    loginBtn = this.page.getByRole("button", { name: "Login" })
    uniqueElement = this.loginBtn

    async fillCredentials(user: Partial<IUser>) {
        user.email && (await this.email.fill(user.email))
        user.password && (await this.password.fill(user.password))
    }

    async clickLoginBtn() {
        await this.loginBtn.click()
    }

    async goToSalesPortal() {
        await this.page.goto("https://anatoly-karpovich.github.io/aqa-course-project/#")
    }
}