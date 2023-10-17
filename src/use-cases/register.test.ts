import { expect, describe, it, beforeEach } from 'vitest'
import { compare } from 'bcryptjs'
import { RegisterUseCase } from './register'
import { InMenoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

let usersRepository: InMenoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMenoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be able to register', async () => {
    const { user } = await sut.execute({
      name: 'Joao Teles',
      email: 'joaoteles@teste.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
  it('shoud hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Joao Teles',
      email: 'joaoteles@teste.com',
      password: '123456',
    })

    const isPasswordCorrectlyHashed = await compare(
      '123456',
      user.password_hash,
    )
    expect(isPasswordCorrectlyHashed).toBe(true)
  })
  it('shoud shold not able to register with same email twice', async () => {
    const email = 'joaoteles@teste.com'

    await sut.execute({
      name: 'Joao Teles',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Joao Teles',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
