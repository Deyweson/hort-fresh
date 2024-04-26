import { hash } from "bcryptjs";
import { IUserRepository } from "../repositories/IUserRepository";
import { EmailAlreadyInUse } from "./errors/EmailAlreadyInUse";

interface UserRequest {
    name: string
    email: string
    password: string
}

export class RegisterUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute({ name, email, password }: UserRequest) {
        const password_hashed = await hash(password, 6)

        const validateEmail = await this.userRepository.findByEmail(email)

        if (validateEmail !== null) {

            throw new EmailAlreadyInUse()
        }

        const user = await this.userRepository.create({ name, email, password: password_hashed })

        return user
    }
}