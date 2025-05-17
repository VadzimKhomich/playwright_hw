import { test, expect } from "fixtures/controllersFixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { loginChema } from "data/shemas/login/login.shema";
import { STATUS_CODES } from "data/status.codes";
import { validateSchema } from "utilits/validation/validation.schema";

test.describe("[API] [SalesPortl] [Login]", () => {
  test("Should login with smoke data", async ({ signInController }) => {
    const loginResponse = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    const token = loginResponse.headers["authorization"];
    console.log(token)
    const expectedUser = {
      _id: "6803584fd006ba3d475faca0",
      username: "vad",
      firstName: "Vadzim",
      lastName: "Khomich",
      roles: ["USER"],
      createdOn: "2025/04/19 08:01:19",
    };
    expect.soft(loginResponse.status).toBe(STATUS_CODES.OK);
    expect.soft(loginResponse.body.User).toMatchObject(expectedUser);
    expect.soft(token).toBeTruthy();
    expect.soft(loginResponse.body.ErrorMessage).toBe(null);
    expect.soft(loginResponse.body.IsSuccess).toBe(true);
    validateSchema(loginChema, loginResponse.body);
  });
});
