import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api.config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { loginChema } from "data/shemas/login/login.shema";
import { STATUS_CODES } from "data/status.codes";
import { validateSchema } from "utilits/validation/validation.schema";

test.describe("[API] [SalesPortl] [Login]", () => {
  test("Should login with smoke data", async ({ request }) => {
    const loginResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN,
      {
        data: { username: USER_LOGIN, password: USER_PASSWORD },
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const loginResponseBody = await loginResponse.json();
    const headers = loginResponse.headers();
    const token = headers["authorization"];
    const expectedUser = {
      _id: "6803584fd006ba3d475faca0",
      username: "vad",
      firstName: "Vadzim",
      lastName: "Khomich",
      roles: ["USER"],
      createdOn: "2025/04/19 08:01:19",
    };
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(loginResponseBody.User).toMatchObject(expectedUser);
    expect.soft(token).toBeTruthy();
    expect.soft(loginResponseBody.ErrorMessage).toBe(null);
    expect.soft(loginResponseBody.IsSuccess).toBe(true);
    console.log(loginResponseBody)
    validateSchema(loginChema, loginResponseBody);
  });
});


