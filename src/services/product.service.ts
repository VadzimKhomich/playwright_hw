import { Page } from "@playwright/test";
import { NewProductPage } from "ui/pages/products/add-new-product.page";
import { ProductsPage } from "ui/pages/products/products-page";
import { logStep } from "utilits/validation/reporter.utils";

export class ProductUIService {
  addNewProductPage: NewProductPage;
  productPage: ProductsPage;
  constructor(private page: Page) {
    this.addNewProductPage = new NewProductPage(page);
    this.productPage = new ProductsPage(page);
  }
  @logStep("Open Add New Product Page")
  async openAddNewPage() {
    await this.productPage.clickAddProduct()
    await this.addNewProductPage.waitForOpened()
  }

}