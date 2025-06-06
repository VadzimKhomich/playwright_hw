import { Page } from "@playwright/test";
import { ModuleName } from "types/home.types";
import { CustomersPage } from "ui/pages/customers/customers-page";
import { HomePage } from "ui/pages/home-page";
import { ProductsPage } from "ui/pages/products/products-page";
import { logStep } from "utilits/validation/reporter.utils";

export class HomeUIService {
  private readonly homePage: HomePage;
  private readonly customersPage: CustomersPage;
  private readonly productPage: ProductsPage;
  constructor(private page: Page) {
    this.homePage = new HomePage(page);
    this.productPage = new ProductsPage(page);
    this.customersPage = new CustomersPage(page);
  }
 @logStep()
  async openModule(moduleName: ModuleName) {
    await this.homePage.clickModuleButton(moduleName);
    switch (moduleName) {
      case "Products":
        await this.productPage.waitForOpened();
        break;

      case "Customers":
        await this.customersPage.waitForOpened();
        break;
    }
  }
}
