import { test as base } from "fixtures/mock.fixture";
import { CustomersPage } from "ui/pages/customers/customers-page";
import { NewCustomerPage } from "ui/pages/customers/new-customer-page";
import { HomePage } from "ui/pages/home-page";
import { LoginPage } from "ui/pages/login-page";

interface ISalesPortalPages {
  homePage: HomePage;
  customersPage: CustomersPage;
  newCustomerPage: NewCustomerPage;
  loginPage: LoginPage;
}

export const test = base.extend<ISalesPortalPages>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  customersPage: async ({ page }, use) => {
    await use(new CustomersPage(page));
  },
  newCustomerPage: async ({ page }, use) => {
    await use(new NewCustomerPage(page));
  },
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },
});

export { expect } from "@playwright/test";
