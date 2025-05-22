import { faker } from '@faker-js/faker';
import { IProduct } from "types/products.types";
import { MANUFACTURER } from "./manufacturer.data";
import { getRandromEnumValue } from "utilits/emum.utilits";


export function generateProduct(params?: Partial<IProduct>) {
    return {
        name: `Test ${faker.string.alpha(20)}`,
        price: faker.number.int(99999),
        manufacturer: getRandromEnumValue(MANUFACTURER),
        amount: faker.number.int(999),
        notes: `Notes ${faker.string.alpha(244)}`,
        ...params
    }
    
}