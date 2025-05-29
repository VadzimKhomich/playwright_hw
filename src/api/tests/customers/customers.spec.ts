import { test, expect } from "fixtures/controllersFixture";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { genereateCustomerData } from "data/customers/new-customer.data";
import { customersSchema } from "data/shemas/customers/customers.schema";
import { STATUS_CODES } from "data/status.codes";
import _ from "lodash";
import { ICustomer } from "types/customer.types";
import { validateSchema } from "utilits/validation/validation.schema";
import { TAGS } from "data/tags/tags.data";

test.describe("[API] [SalesPortal] [Customers]", () => {
  
  test("Should get Customers list", {tag: [TAGS.API]}, async ({
    customerController,
    signInController,
  }) => {
    const loginResponse = await signInController.signIn({
      username: USER_LOGIN,
      password: USER_PASSWORD,
    });
    const token = loginResponse.headers["authorization"];
    expect.soft(loginResponse.status).toBe(STATUS_CODES.OK);
    expect.soft(token).toBeTruthy();
    //create customer
    const customerData = genereateCustomerData();
    const createCustomerResponse = await customerController.create(
      customerData,
      token
    );
    expect.soft(createCustomerResponse.status).toBe(STATUS_CODES.CREATED);
    //get all customers
    const getCustomersList = await customerController.getAll(token);
    expect.soft(getCustomersList.status).toBe(STATUS_CODES.OK);
    expect.soft(getCustomersList.body.ErrorMessage).toBe(null);
    expect.soft(getCustomersList.body.IsSuccess).toBe(true);
    validateSchema(customersSchema, getCustomersList.body);
    const customerInList = getCustomersList.body.Customers.some(
      (customer: ICustomer) => customer.email === customerData.email
    );
    expect.soft(customerInList).toBeTruthy();
    // delete customer
    const deleteCustomerResponse = await customerController.delete(
      createCustomerResponse.body.Customer._id,
      token
    );
    expect.soft(deleteCustomerResponse.status).toBe(STATUS_CODES.DELETED);
  });
});
