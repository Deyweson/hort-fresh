import { randomUUID } from "crypto";
import { IUser, IUserCreateInput, IUserRepository } from "./IUserRepository";

export class MemoryUserRepository implements IUserRepository {
    private users: IUser[] = []

    async findById(id: string) {
        const user = this.users.find((user) => user.id === id)
        if (user === undefined) {
            return null
        }
        return user
    }


    async create({ name, email, password }: IUserCreateInput) {
        const user = {
            id: randomUUID(),
            name,
            email,
            password
        }
        this.users.push(user)
        return user
    }

    async findByEmail(email: string) {
        const user = this.users.find((user) => user.email === email)
        if (user === undefined) {
            return null
        }
        return user

    }

}