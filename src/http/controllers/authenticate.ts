import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeAuthenticateUseCase } from "../../useCases/factories/makeAuthenticateUseCase";
import { InvalidCredentials } from "../../useCases/errors/InvalidCredentials";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const requetsBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })

    const { email, password } = requetsBodySchema.parse(request.body)

    try {
        const authenticateUseCase = makeAuthenticateUseCase()
        const { user } = await authenticateUseCase.execute({ email, password })

        const token = await reply.jwtSign({}, {
            sign: {
                sub: user.id
            }
        })

        return reply.status(200).send(token)

    } catch (error) {
        if (error instanceof InvalidCredentials) {
            return reply.status(400).send({ message: error.message })
        }
        throw error
    }






}