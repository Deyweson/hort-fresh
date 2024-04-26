import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeRegisterUseCase } from "../../useCases/factories/makeRegisterUseCase";
import { EmailAlreadyInUse } from "../../useCases/errors/EmailAlreadyInUse";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const requetsBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8)
    })

    const { name, email, password } = requetsBodySchema.parse(request.body)

    try {
        const registerUseCase = makeRegisterUseCase()
        await registerUseCase.execute({ name, email, password })
    } catch (error) {
        if (error instanceof EmailAlreadyInUse) {
            return reply.status(400).send({ message: error.message })
        }
        throw Error
    }


    return reply.status(201).send()

}