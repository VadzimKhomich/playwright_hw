import { HomeUIService } from "services/home.service";
import { ProductUIService } from "services/product.service";
import { SignInUIService } from "services/signin.service";
import { test as base } from "../fixtures/pages.fixtures";
import { AddNewProductUIService } from "services/add-new-product.servise";

interface IUIServices {
  homeUIService: HomeUIService;
  signInUIService: SignInUIService;
  productsUIService: ProductUIService;
  addNewProductPage: AddNewProductUIService;
}

export const test = base.extend<IUIServices>({
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  signInUIService: async ({ page }, use) => {
    await use(new SignInUIService(page));
  },
  productsUIService: async ({ page }, use) => {
    await use(new ProductUIService(page));
  },
  addNewProductPage: async ({page}, use) => {
    await use(new AddNewProductUIService(page))
  }
});

export { expect } from "@playwright/test";