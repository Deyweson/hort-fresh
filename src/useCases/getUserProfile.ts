import { IUserRepository } from "../repositories/IUserRepository";
import { ResourceNotFound } from "./errors/ResourceNotFoundError";

export class GetUserProfileUseCase {
    constructor(private userRepository: IUserRepository) { }

    async execute(id: string) {

        const user = await this.userRepository.findById(id)

        if (user === null) {
            throw new ResourceNotFound()
        }

        const userInfo = {
            name: user.name,
            email: user.email,
            phone: user.userInfos?.phone || null,
            verify: user.userInfos?.verify || false,
            adrress: {
                street: user.userInfos?.street,
                number: user.userInfos?.number,
                city: user.userInfos?.city,
                state: user.userInfos?.state,
                zipCode: user.userInfos?.zipCode
            }
        }

        return { userInfo }

    }
}