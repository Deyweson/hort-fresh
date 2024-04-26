export interface IUserdata {
    id?: string
    name: string
    email: string
    password: string
}



export interface IUserRepository {
    create(data: IUserdata): Promise<IUserdata>
    findByEmail(email: string): Promise<IUserdata | null>
}
