import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { compare } from "bcryptjs";

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {

    const requetsBodySchema = z.object({
        email: z.string().email(),
        password: z.string().min(8)
    })

    const { email, password } = requetsBodySchema.parse(request.body)

    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
        throw new Error('Invalid credentials')
    }

    const password_hash = await compare(password, user.password)
    if (!password_hash) {
        throw new Error('Invalid credentials')
    }

    const token = await reply.jwtSign({}, {
        sign: {
            sub: user.id
        }
    })


    return reply.status(200).send(token)

}