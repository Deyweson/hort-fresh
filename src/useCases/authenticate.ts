
import { compare } from "bcryptjs";
import { IUserRepository, IUserdata } from "../repositories/IUserRepository";
import { InvalidCredentials } from "./errors/InvalidCredentials";


interface UserRequest {
    email: string
    password: string
}

interface UserResponse {
    user: IUserdata
}

export class AuthenticateUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute({ email, password }: UserRequest): Promise<UserResponse> {

        const user = await this.userRepository.findByEmail(email)
        if (user === null) {
            throw new InvalidCredentials()
        }
        const password_hash = await compare(password, user.password)

        if (!password_hash) {
            throw new InvalidCredentials()
        }

        return { user }
    }
}