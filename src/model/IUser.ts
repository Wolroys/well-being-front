export interface IUser {
    id: number,
    name: string,
    lastName: string,
    email: string,
    role?: string,
}

export interface INewUser {
    id: number,
    name: string,
    lastName: string,
    email: string,
    password: string,
}