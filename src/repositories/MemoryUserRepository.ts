import { randomUUID } from "crypto";
import { IUserRepository, IUserdata } from "./IUserRepository";

export class MemoryUserRepository implements IUserRepository {

    private users: IUserdata[] = []

    async create({ name, email, password }: IUserdata) {
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