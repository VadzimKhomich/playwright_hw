import test from "@playwright/test";
import { LoginPage } from "../../pages/login-page";
import { getUser } from "data/user.data";
import { NOTIFICATIONS } from "data/notification.data";
import { HomePage } from "ui/pages/home-page";
import { CustomersPage } from "ui/pages/customers/customers-page";
import { NewCustomerPage } from "ui/pages/customers/new-customer-page";
import { genereateCustomerData } from "data/customers/new-customer.data";

test.describe("[UI] [Sales Portal] Create Customer", async () => {
    test("Should create customer", async ({ page }) => {
        const loginPge = new LoginPage(page)
        const homePage = new HomePage(page)
        const customersPage = new CustomersPage(page)
        const newCustomerPage = new NewCustomerPage(page)
        //LoginPage
        await loginPge.goToSalesPortal()
        const user = getUser()
        await loginPge.fillCredentials(user)
        await loginPge.clickLoginBtn()
        //HomePage
        await homePage.waitForOpened()
        await homePage.clickModuleButton("Customers")
        //CustomerPage
        await customersPage.waitForOpened()
        await customersPage.addCustomerBntClick()
        //NewCustomerPage
        await newCustomerPage.waitForOpened()
        const customer = genereateCustomerData()

        await newCustomerPage.fillNewCustomerFields(customer)
        await newCustomerPage.clickSaveNewCustomer()
        await newCustomerPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED)
        await customersPage.waitForOpened()
        //CheckCreatedUser
        await customersPage.checkCreatedCustomer(customer)

    })
})