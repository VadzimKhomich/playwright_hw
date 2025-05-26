import { expect, Page } from "@playwright/test";
import { apiConfig } from "config/api.config";
import { generateProduct } from "data/products/new-product.data";
import { STATUS_CODES } from "data/status.codes";
import { IProduct, IProductResponse } from "types/products.types";
import { NewProductPage } from "ui/pages/products/add-new-product.page";
import { ProductsPage } from "ui/pages/products/products-page";
import { logStep } from "utilits/validation/reporter.utils";

export class PageHolder {
  constructor(protected page: Page) {}
}

export class AddNewProductUIService extends PageHolder {
  private addNewProductPage: NewProductPage = new NewProductPage(this.page);
  private productPage: ProductsPage = new ProductsPage(this.page);
  
  @logStep("Create Product")
  async create(productData?: IProduct) {
    const data = generateProduct(productData);
    await this.addNewProductPage.fillProductFields(data);
    const response = await this.addNewProductPage.interceptResponse<
      IProductResponse,
      any
    >(
      apiConfig.ENDPOINTS.PRODUCTS,
      this.addNewProductPage.clickSaveProductButton.bind(this.addNewProductPage)
    );
    expect(response.status).toBe(STATUS_CODES.CREATED);
    expect(response.body.Product).toMatchObject({ ...data });
    await this.productPage.waitForOpened();
    return response.body.Product;
  }
}
