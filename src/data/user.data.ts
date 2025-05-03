import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { IUser } from "../types/user.type";

export function getUser(params?: Partial<IUser>): IUser {
    return {
        email: USER_LOGIN,
        password: USER_PASSWORD,
        ...params
    }
}