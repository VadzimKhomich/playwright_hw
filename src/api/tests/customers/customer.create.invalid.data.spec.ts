import { test, expect } from "fixtures/controllersFixture";
import { createCustomerInvaliData } from "data/customers/api.customer.data";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { STATUS_CODES } from "data/status.codes";
import { genereateCustomerData } from "data/customers/new-customer.data";
import { TAGS } from "data/tags/tags.data";

test.describe("[API] [SalesPortal] [Create customer with invalid parametrs]", () => {
  let token: string;
  test.beforeAll(async ({ signInController }) => {
    const loginResponse = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    token = loginResponse.headers["authorization"];
  });

  createCustomerInvaliData.forEach(({ testName, customer }) => {
    test(testName, {tag: [TAGS.API]}, async ({ customerController }) => {
      const customerResponse = await customerController.create(customer, token);
      expect.soft(customerResponse.status).toBe(STATUS_CODES.BAD_REQUEST);
      expect.soft(customerResponse.body.IsSuccess).toBe(false);
      expect
        .soft(customerResponse.body.ErrorMessage)
        .toBe("Incorrect request body");
    });
  });

  test("Should not to create customer with existing email", {tag: [TAGS.API]}, async ({
    signInController,
    customerController,
  }) => {
    const loginResponse = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    const token = loginResponse.headers["authorization"];
    const customer = genereateCustomerData();
    const customerResponse = await customerController.create(customer, token);
    const customerDuplicate = genereateCustomerData({
      email: customerResponse.body.Customer.email,
    });
    const customerResponseDuplicate = await customerController.create(
      customerDuplicate,
      token
    );
    expect.soft(customerResponseDuplicate.status).toBe(STATUS_CODES.CONFLICT);
    expect(customerResponseDuplicate.body.ErrorMessage).toBe(
      `Customer with email '${customerResponse.body.Customer.email}' already exists`
    );
    expect.soft(customerResponseDuplicate.body.IsSuccess).toBe(false);

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
