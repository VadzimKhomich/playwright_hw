import { ICustomerTestData } from "types/customer.types";
import { genereateCustomerData } from "./new-customer.data";

export const createCustomerInvaliData: ICustomerTestData[] = [
  {
    testName: "Unable to create customer with empty email",
    customer: genereateCustomerData({ email: "" }),
  },
  {
    testName: "Unable to create customer with long name",
    customer: genereateCustomerData({
      name: "gkyhlmifjqmisfoc obzfvqosazdxxgieidfhkgngx",
    }),
  },
  {
    testName: "Unable to create customer with invalid country",
    customer: genereateCustomerData({ country: undefined }),
  },
  {
    testName: "Unable to create customer with empty city",
    customer: genereateCustomerData({ city: "" }),
  },
  {
    testName: "Unable to create customer with long city name",
    customer: genereateCustomerData({
      city: "gkyhlmifjqmisfocobzfvqosazdxxgieidfhkgngx",
    }),
  },
  {
    testName: "Unable to create customer with empty street",
    customer: genereateCustomerData({ street: "" }),
  },
  {
    testName: "Unable to create customer with long street name",
    customer: genereateCustomerData({
      street: "gkyhlmifjqmisfocsdsobzfvqosazdxxgieidfhkgngx",
    }),
  },
  {
    testName: "Unable to create customer with invalid house = 0",
    customer: genereateCustomerData({ house: 0 }),
  },
  {
    testName: "Unable to create customer with invalid house = 1000",
    customer: genereateCustomerData({ house: 1000 }),
  },
  {
    testName: "Unable to create customer with invalid flat = 0",
    customer: genereateCustomerData({ flat: 0 }),
  },
  {
    testName: "Unable to create customer with invalid flat = 10000",
    customer: genereateCustomerData({ flat: 10000 }),
  },
  {
    testName: "Unable to create customer with invalid phone number without +",
    customer: genereateCustomerData({ phone: "3242343" }),
  },
  {
    testName: "Unable to create customer with invalid phone number",
    customer: genereateCustomerData({
      phone: "+234435234353234244353453453432434234234",
    }),
  },
  {
    testName: "Unable to create customer with invalid note",
    customer: genereateCustomerData({ phone: "<some text>" }),
  },
];

export const createCustomerValidData: ICustomerTestData[] = [
  {
    testName: "Create customer with valid data",
    customer: genereateCustomerData(),
  },
  {
    testName: "Create customer with min long name",
    customer: genereateCustomerData({ name: "T" }),
  },
  {
    testName: "Create customer with max long name",
    customer: genereateCustomerData({
      name: "lwlnyzrtkxmdmdehgtsgnayxkxrceqap czeccul",
    }),
  },
  {
    testName: "Create customer with min long city",
    customer: genereateCustomerData({ city: "T" }),
  },
  {
    testName: "Create customer with max long city",
    customer: genereateCustomerData({ city: "ellnlmdlekhva cxyqml" }),
  },
  {
    testName: "Create customer with min long street name",
    customer: genereateCustomerData({ street: "T" }),
  },
  {
    testName: "Create customer with max long street name",
    customer: genereateCustomerData({
      street: "lwlnyzrtkxmdmdehgtsgnayxkxrceqap czeccul",
    }),
  },
  {
    testName: "Create customer with min house",
    customer: genereateCustomerData({ house: 1 }),
  },
  {
    testName: "Create customer with max house",
    customer: genereateCustomerData({ house: 999 }),
  },
  {
    testName: "Create customer with min flat",
    customer: genereateCustomerData({ flat: 1 }),
  },
  {
    testName: "Create customer with max flat",
    customer: genereateCustomerData({ flat: 9999 }),
  },
  {
    testName: "Create customer with max notes",
    customer: genereateCustomerData({
      notes:
        "cnkhsdspxrhyhtjyylsrebunglmwnonilyyxgcymghywwxverzyypbspuqlleeunygmokjlhelpxbqkzapehoywdqwuqpwhnggowbecjlqtpumgdjemvtynrbtinuiopxsuijngeheaoslxolnushmygbepffggdxrqntolzxgqlrfifhnjyhdiviyobxsuhhjtwpnxqbljuicynshchqdkbdjirvunrxigxrjioznrikhgrsjmrtz",
    }),
  },
  {
    testName: "Create customer with min notes",
    customer: genereateCustomerData({
      notes: "",
    }),
  },
  {
    testName: "Create customer with max phone number",
    customer: genereateCustomerData({ phone: "+12345678901234567890" }),
  },
  {
    testName: "Create customer with min phone number",
    customer: genereateCustomerData({ phone: "+1234567890" }),
  },
];
