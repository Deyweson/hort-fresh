import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "../../useCases/factories/makeGetUserProfileUseCase";

export async function getUserProfile(request: FastifyRequest, reply: FastifyReply) {

    await request.jwtVerify()

    const id = request.user.sub
    
    const getUserProfileUseCase = makeGetUserProfileUseCase()

    const user = await getUserProfileUseCase.execute(id)

    return reply.status(200).send(user)


}