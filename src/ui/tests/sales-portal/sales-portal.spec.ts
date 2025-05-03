import { test, expect } from "fixtures/pages.fixtures";
import { getUser } from "data/user.data";
import { NOTIFICATIONS } from "data/notification.data";
import { genereateCustomerData } from "data/customers/new-customer.data";
import _ from "lodash";

test.describe("[UI] [Sales Portal] Create Customer", async () => {
  test("Should create customer", async ({
    loginPage,
    homePage,
    customersPage,
    newCustomerPage,
  }) => {
    //LoginPage
    await loginPage.goToSalesPortal();
    const user = getUser();
    await loginPage.fillCredentials(user);
    await loginPage.clickLoginBtn();
    //HomePage
    await homePage.waitForOpened();
    await homePage.clickModuleButton("Customers");
    //CustomerPage
    await customersPage.waitForOpened();
    await customersPage.addCustomerBntClick();
    //NewCustomerPage
    await newCustomerPage.waitForOpened();
    const customer = genereateCustomerData();
    await newCustomerPage.fillNewCustomerFields(customer);
    await newCustomerPage.clickSaveNewCustomer();
    await newCustomerPage.waitForNotification(NOTIFICATIONS.CUSTOMER_CREATED);
    await newCustomerPage.clickCloseNotification()
    await customersPage.waitForOpened();
    //CheckCreatedUser
    const createdCustomerData = await customersPage.getCustomerData(
      customer.email
    );
    expect(createdCustomerData).toEqual(
      _.pick(customer, ["email", "name", "country"])
    );
    //DeleteCreatedCustomer
    await customersPage.clickTableAction(customer.email, "delete");
    await customersPage.deleteModal.waitForOpened()
    await customersPage.deleteModal.clickYesBtn()
    await customersPage.deleteModal.waitForClosed()
    //Check that Customer is deleted
    await customersPage.waitForNotification(NOTIFICATIONS.CUSTOMER_DELETED)
    await customersPage.waitForOpened();
    await expect(customersPage.emailCell(customer.email)).not.toBeVisible()
  });
});
