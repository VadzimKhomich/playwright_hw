import { ROLES } from "data/customers/roles.data";

export const loginChema = {
  type: "object",
  properties: {
    IsSuccess: {
      type: "boolean",
    },
    ErrorMessage: { type: ["string", "null"] },
    User: {
      type: "object",
      properties: {
        _id: {
          type: "string",
        },
        username: {
          type: "string",
        },
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        roles: {
          type: "array",
          items: { type: "string", enum: Object.values(ROLES) },
        },
        createdOn: {
          type: "string",
        },
      },
      required: [
        "_id",
        "username",
        "firstName",
        "lastName",
        "roles",
        "createdOn",
      ],
    },
  },
  required: ["IsSuccess", "ErrorMessage", "User"],
};
