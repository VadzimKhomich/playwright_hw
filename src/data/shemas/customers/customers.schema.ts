import { COUNTRIES } from "data/customers/countries.data";

export const customersSchema = {
  type: "object",
  properties: {
    Customers: {
      type: "array",
      items: {
        type: "object",
        properties: {
          _id: {
            type: "string",
          },
          email: {
            type: "string",
          },
          name: {
            type: "string",
          },
          country: { type: "string", enum: Object.values(COUNTRIES) },
          city: {
            type: "string",
          },
          street: {
            type: "string",
          },
          house: {
            type: "number",
          },
          flat: {
            type: "number",
          },
          phone: {
            type: "string",
          },
          createdOn: {
            type: "string",
          },
          notes: {
            type: "string",
          },
        },
        required: [
          "_id",
          "email",
          "name",
          "country",
          "city",
          "street",
          "house",
          "flat",
          "phone",
          "createdOn",
        ],
      },
    },
    IsSuccess: { type: "boolean" },
    ErrorMessage: { type: ["string", "null"] },
    sotring: {
      type: "object",
      properties: {
        sortField: { type: "string" },
        sortOrder: { type: "string" },
      },
      required: ["sortField", "sortOrder"],
    },
  },
  required: ["IsSuccess", "ErrorMessage", "Customers", "sorting"],
};
