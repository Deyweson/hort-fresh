import { prisma } from "../lib/prisma";
import { IUserCreateInput, IUserRepository } from "./IUserRepository";

export class PrismaUserRepository implements IUserRepository {

    async findById(id: string) {
        const user = await prisma.user.findUnique({ where: { id }, include: { UserInfo: true } })
        return user
    }

    async create({ name, email, password }: IUserCreateInput) {
        const user = await prisma.user.create({ data: { name, email, password, UserInfo: { create: {} } } });
        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({ where: { email } })
        return user
    }

}