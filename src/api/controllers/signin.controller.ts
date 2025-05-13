import { RequestApi } from "api/apiClients/request";
import { apiConfig } from "config/api.config";
import { IRequestOptions, ISignInResponse } from "types/api.types";
import { ICredentials } from "types/user.type";

export class SignInController {
  constructor(private request = new RequestApi()){}
  async signIn(body: ICredentials) {
    const options: IRequestOptions = {
      url: apiConfig.ENDPOINTS.LOGIN,
      method: "post",
      data: body,
      headers: {
        "content-type": "application/json",
      },
    };

    return await this.request.send<ISignInResponse>(options)
  }
}
