import { IUser } from "../types/user.type";

export function getUser(params?: Partial<IUser>): IUser {
    return {
        email: "vad",
        password: "1q2w3e4r5t",
        ...params
    }
}