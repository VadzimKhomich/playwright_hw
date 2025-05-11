import test, { expect } from "@playwright/test";
import { apiConfig } from "config/api.config";
import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { genereateCustomerData } from "data/customers/new-customer.data";
import { customersSchema } from "data/shemas/customers/customers.schema";
import { STATUS_CODES } from "data/status.codes";
import _ from "lodash";
import { ICustomer } from "types/customer.types";
import { validateSchema } from "utilits/validation/validation.schema";

test.describe("[API] [SalesPortal] [Customers]", () => {
  test("Should get Customers list", async ({ request }) => {
    //login
    const loginResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.LOGIN,
      {
        data: { username: USER_LOGIN, password: USER_PASSWORD },
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const headers = loginResponse.headers();
    const token = headers["authorization"];
    expect.soft(loginResponse.status()).toBe(STATUS_CODES.OK);
    expect.soft(token).toBeTruthy();
    //create customer
    const customerData = genereateCustomerData();
    const createCustomerResponse = await request.post(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS,
      {
        data: customerData,
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const customerBody = await createCustomerResponse.json();
    expect.soft(createCustomerResponse.status()).toBe(STATUS_CODES.CREATED);
    //get customers list
    const getCustomersList = await request.get(
      apiConfig.BASE_URL + apiConfig.ENDPOINTS.CUSTOMERS,
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const getCustomersListBody = await getCustomersList.json();
    expect.soft(getCustomersList.status()).toBe(STATUS_CODES.OK);
    expect.soft(getCustomersListBody.ErrorMessage).toBe(null);
    expect.soft(getCustomersListBody.IsSuccess).toBe(true);
    validateSchema(customersSchema, getCustomersListBody);
    const customerInList = getCustomersListBody.Customers.some(
      (customer: ICustomer) => customer.email === customerData.email
    );
    expect.soft(customerInList).toBeTruthy();
    // delete customer
    const deleteCustomerResponse = await request.delete(
      apiConfig.BASE_URL +
        apiConfig.ENDPOINTS.CUSTOMER_BY_ID(customerBody.Customer._id),
      {
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    expect.soft(deleteCustomerResponse.status()).toBe(STATUS_CODES.DELETED)
  });
});
