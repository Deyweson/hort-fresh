import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";
import { AuthenticateUseCase } from "../authenticate";


export function makeAuthenticateUseCase() {
    const userRepository = new PrismaUserRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    return authenticateUseCase
}