export interface ICredentials {
    username: string,
    password: string,
}
export interface IUserResponse {
    _id: string,
    username: string,
    firstName: string,
    lastName: string,
    roles: string[],
    createdOn: string
}
