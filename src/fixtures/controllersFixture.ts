import { test as base } from "@playwright/test";
import { CustomerController } from "api/controllers/customer.controller";
import { SignInController } from "api/controllers/signin.controller";

interface ISalesPortalControllers {
  customerController: CustomerController;
  signInController: SignInController;
}

export const test = base.extend<ISalesPortalControllers>({
  customerController: async ({}, use) => {
    await use(new CustomerController());
  },
  signInController: async ({}, use) => {
    await use(new SignInController());
  },
});

export { expect } from "@playwright/test";


