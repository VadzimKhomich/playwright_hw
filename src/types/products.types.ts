import { MANUFACTURER } from "data/products/manufacturer.data";
import { IResponseFields } from "./api.types";

export interface IProduct {
    name: string,
    price: number,
    manufacturer: MANUFACTURER,
    amount: number,
    notes?: string
}

export interface IProductFromResponse extends IProduct {
    _id: string,
    createdOn: string
}

export interface IProductResponse extends IResponseFields {
  Product: IProductFromResponse
}
