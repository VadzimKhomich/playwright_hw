import { APIRequestContext } from "@playwright/test";
import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api.config";
import { IRequestOptions, ISignInResponse } from "types/api.types";
import { ICredentials } from "types/user.type";
import { logStep } from "utilits/validation/reporter.utils";

export class SignInController {
  private request: RequestApi;
  constructor(private context: APIRequestContext) {
    this.request = new RequestApi(context);
  }

  @logStep("Login")
  async signIn(body: ICredentials) {
    const options: IRequestOptions = {
      baseURL: apiConfig.BASE_URL,
      url: apiConfig.ENDPOINTS.LOGIN,
      method: "post",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    };

    return await this.request.send<ISignInResponse>(options);
  }
}
