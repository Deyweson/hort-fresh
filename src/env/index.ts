import { error } from 'console'
import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
    PORT: z.coerce.number(),
    JWT_SECRET: z.string()
})

const _env = envSchema.safeParse(process.env)

if(!_env.success){
    console.log('Invalid or incomplete enviroment variables', _env.error.format())
    throw new Error('Invalid or incomplete enviroment variables')
}

export const env = _env.data