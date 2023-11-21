import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMenoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentials } from './erros/inavalid-credentials'
import { hash } from 'bcryptjs'

let usersRepository: InMenoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMenoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)

    const createUser = {
      email: 'lid.sarti@testeteste.com',
      password_hash: await hash('123456', 6),
      name: 'Lídia Sarti',
    }
    await usersRepository.create(createUser)
  })
  it('should be able to authenticate', async () => {
    const userCredentials = {
      email: 'lid.sarti@testeteste.com',
      password: '123456',
    }
    const { user } = await sut.execute(userCredentials)
    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong password', async () => {
    const user = {
      email: 'lid.teste@gmail.com',
      password: 'wrongpassword',
    }
    await expect(sut.execute(user)).rejects.toThrow(new InvalidCredentials())
  })

  it('should not be able to authenticate with wrong user', async () => {
    const user = {
      email: 'nonexistentuser@teste.com',
      password: 'wrongpassword',
    }
    await expect(sut.execute(user)).rejects.toThrow(new InvalidCredentials())
  })
})
