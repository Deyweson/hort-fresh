import { PrismaUserRepository } from "../../repositories/PrismaUserRepository";
import { GetUserProfileUseCase } from "../getUserProfile";

export function makeGetUserProfileUseCase() {
    const userRepository = new PrismaUserRepository()
    const getUserProfileUseCase = new GetUserProfileUseCase(userRepository)

    return getUserProfileUseCase
}