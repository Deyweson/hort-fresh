import { prisma } from "../lib/prisma";
import { IUserRepository, IUserdata } from "./IUserRepository";

export class PrismaUserRepository implements IUserRepository {

    async create({ name, email, password }: IUserdata) {
        const user = await prisma.user.create({ data: { name, email, password } });
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } })
        return user
    }

}