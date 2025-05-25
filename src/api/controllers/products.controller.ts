import { APIRequestContext } from "@playwright/test";
import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api.config";
import { IRequestOptions } from "types/api.types";
import { IProductResponse } from "types/products.types";

export class ProductController {
  private request: RequestApi
  constructor(private context: APIRequestContext) {
    this.request = new RequestApi(context)
  }

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
