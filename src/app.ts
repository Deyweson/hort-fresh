import fastify from "fastify";
import fastifyJwt from "@fastify/jwt";
import { routes } from "./http/routes";
import { env } from "./env";

export const app = fastify();

app.register(routes)

app.register(fastifyJwt, { secret: env.JWT_SECRET })

