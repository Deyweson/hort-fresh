import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

export async function register(request: FastifyRequest, reply: FastifyReply) {
    const requetsBodySchema = z.object({
        name: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8)
    })

    const { name, email, password } = requetsBodySchema.parse(request.body)
    const password_hashed = await hash(password, 6)


    const validateEmail = await prisma.user.findUnique({ where: { email } })
    if (validateEmail) {
        throw new Error('Email already in use')
    }

    await prisma.user.create({
        data: {
            name, email, password: password_hashed
        }
    })

    return reply.status(201).send()

}