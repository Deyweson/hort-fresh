import { describe } from "node:test";
import { beforeEach, expect, it, should } from "vitest";
import { MemoryUserRepository } from "../src/repositories/MemoryUserRepository";
import { IUserRepository } from "../src/repositories/IUserRepository";
import { AuthenticateUseCase } from "../src/useCases/authenticate";
import { hash } from "bcryptjs";
import { InvalidCredentials } from "../src/useCases/errors/InvalidCredentials";


let userRepository: IUserRepository
let sut: AuthenticateUseCase

describe('User authenticate use case', () => {
    beforeEach(() => {
        userRepository = new MemoryUserRepository()
        sut = new AuthenticateUseCase(userRepository)
    })

    it('Should be able to autenticate', async () => {
        await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: await hash('12345678', 6)
        })

        const { user } = await sut.execute({
            email: 'johndoe@gmail.com',
            password: '12345678'
        })
        expect(user.id).toEqual(expect.any(String))
    })

    it('Should not able to autenticate with wrong password', async () => {
        await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: await hash('12345678', 6)
        })

        expect(async() => {
            await sut.execute({
                email: 'johndoe@gmail.com',
                password: 'wrongpassword'
            })
        }).rejects.toBeInstanceOf(InvalidCredentials)
    })

    it('Should not able to autenticate with wrong email', async () => {
        await userRepository.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: await hash('12345678', 6)
        })

        expect(async () => {
            await sut.execute({
                email: 'wrongjohn@gmail.com',
                password: '12345678'
            })
        }).rejects.toBeInstanceOf(InvalidCredentials)
    })
})