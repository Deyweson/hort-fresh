import { describe, it, beforeEach, expect } from 'vitest'
import { MemoryUserRepository } from '../src/repositories/MemoryUserRepository'
import { RegisterUseCase } from '../src/useCases/register'
import { IUserRepository } from '../src/repositories/IUserRepository'
import { EmailAlreadyInUse } from '../src/useCases/errors/EmailAlreadyInUse'
import { compare } from 'bcryptjs'

let userRepository: IUserRepository
let sut: RegisterUseCase

describe('Testing User register use case', () => {
    beforeEach(() => {
        userRepository = new MemoryUserRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it('should be able to register a user', async () => {
        const user = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'john1234'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not able to register a user with same email', async () => {
        await sut.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'john1234'
        })

        expect(async () => {
            await sut.execute({
                name: 'John Doe',
                email: 'johndoe@gmail.com',
                password: 'john1234'
            })
        }).rejects.toBeInstanceOf(EmailAlreadyInUse)
    })

    it('should hashed user password upon register', async () => {
        const user = await sut.execute({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: 'john1234'
        })

        const passwordIsCorretlyHashed = await compare('john1234', user.password)
        expect(passwordIsCorretlyHashed).toBe(true)
    })
})