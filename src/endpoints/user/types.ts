export interface User {
    email: string,
    password: string
}

export interface AuthenticationRequestBody extends User {}

export interface CreateUserRequestBody extends User {}