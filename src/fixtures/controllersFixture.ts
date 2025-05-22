import { test as base } from "@playwright/test";
import { CustomerController } from "api/controllers/customer.controller";
import { ProductController } from "api/controllers/products.controller";
import { SignInController } from "api/controllers/signin.controller";

interface ISalesPortalControllers {
  customerController: CustomerController;
  signInController: SignInController;
  productController: ProductController;
}

export const test = base.extend<ISalesPortalControllers>({
  customerController: async ({request}, use) => {
    await use(new CustomerController(request));
  },
  signInController: async ({request}, use) => {
    await use(new SignInController(request));
  },
  productController: async ({request}, use) => {
    await use(new ProductController(request));
  },
});

export { expect } from "@playwright/test";


