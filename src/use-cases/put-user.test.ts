import { describe, it, beforeEach, expect } from 'vitest'
import { compare, hash } from 'bcryptjs'
import { UpdateUseCase } from './put-user'
import { InMenoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserDontExistsError } from './erros/user-dont-exists-error'

let usersRepository: InMenoryUsersRepository
let sut: UpdateUseCase

describe('Update Use Case', () => {
  beforeEach(async () => {
    usersRepository = new InMenoryUsersRepository()
    sut = new UpdateUseCase(usersRepository)

    const createUser = {
      email: 'lid.sarti@teste.com',
      password_hash: await hash('123456', 6),
      name: 'Lídia Sarti',
    }

    await usersRepository.create(createUser)
  })

  it('should be able to update', async () => {
    const newUser = {
      email: 'lid.sarti@teste.com',
      password: 'outrasenha',
      name: 'Lídia Teste',
    }

    const { user } = await sut.execute(newUser)

    newUser.password = await hash(newUser.password, 6)

    const userEqual =
      newUser.email === user.email &&
      (await compare(newUser.password, user.password_hash)) &&
      newUser.name === user.name

    expect(userEqual).toBe(false)
  })
  it('should not be able to update an nonexistent user', async () => {
    const newUser = {
      email: 'lid.sarti@testeteste.com',
      password: 'outrasenha',
      name: 'Lídia Teste',
    }

    await expect(() => sut.execute(newUser)).rejects.toBeInstanceOf(
      UserDontExistsError,
    )
  })
})
