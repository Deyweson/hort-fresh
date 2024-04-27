export interface IUserCreateInput {
    name: string
    email: string
    password: string
}

export interface IUser {
    id: string
    name: string
    email: string
    password: string

    userInfos?: IUserInfos
}

export interface IUserInfos {
    userId: string
    street: string
    number: string
    city: string
    state: string
    zipCode: string
    phone: string
    verify: boolean
}


export interface IUserRepository {
    create(data: IUserCreateInput): Promise<IUserCreateInput>
    findByEmail(email: string): Promise<IUser | null>
    findById(id: string): Promise<IUser | null>
}
