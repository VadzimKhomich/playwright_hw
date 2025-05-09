import { USER_LOGIN, USER_PASSWORD } from "config/environment";
import { ICredentials } from "../types/user.type";

export function getUser(params?: Partial<ICredentials>): ICredentials {
    return {
        email: USER_LOGIN,
        password: USER_PASSWORD,
        ...params
    }
}