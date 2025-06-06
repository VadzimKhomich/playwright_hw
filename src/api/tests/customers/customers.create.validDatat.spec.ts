import { test, expect } from "fixtures/controllersFixture";
import { createCustomerValidData } from "data/customers/api.customer.data";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { STATUS_CODES } from "data/status.codes";
import { TAGS } from "data/tags/tags.data";

test.describe("[API] [SalesPortal] [Create customer with valid parametrs]", () => {
let token: string
  test.beforeAll(async({signInController}) => {
    const loginResponse = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    token = loginResponse.headers["authorization"];
  })
  createCustomerValidData.forEach(({ testName, customer }) => {
    test(testName, {tag: [TAGS.API]}, async ({ customerController }) => {

      const customerResponse = await customerController.create(customer, token);
      expect.soft(customerResponse.status).toBe(STATUS_CODES.CREATED);
      expect.soft(customerResponse.body.IsSuccess).toBe(true);
      expect.soft(customerResponse.body.ErrorMessage).toBe(null);
      const res = await customerController.getById(
        customerResponse.body.Customer._id,
        token
      );
      const customerResponseDelete = await customerController.delete(
        customerResponse.body.Customer._id,
        token
      );
      expect.soft(customerResponseDelete.status).toBe(STATUS_CODES.DELETED);
      const deletedCustomer = await customerController.getById(
        customerResponse.body.Customer._id,
        token
      );
      expect.soft(deletedCustomer.status).toBe(STATUS_CODES.NOT_FOUND);
      expect.soft(deletedCustomer.body.Customer).toBeUndefined();
    });
  });
});
