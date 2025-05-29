import { APIRequestContext, Page } from "@playwright/test";
import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api.config";
import { IRequestOptions } from "types/api.types";
import { IProductResponse } from "types/products.types";
import { logStep } from "utilits/validation/reporter.utils";

export class ProductController {
  private request: RequestApi;
  constructor(private context: APIRequestContext, private page: Page) {
    this.request = new RequestApi(context);
  }

  // const token = (await this.page.context().cookies()).find((el) => el.name === 'Authorization')!.value
  @logStep("Get Product by ID")
  async getById(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.PRODUCTS_BY_ID(id),
      method: "get",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<IProductResponse>(options);
  }
  @logStep("Delete Product")
  async delete(id: string, token: string) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.PRODUCTS_BY_ID(id),
      method: "delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return await this.request.send<null>(options);
  }
}
