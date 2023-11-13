import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { InMenoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { InvalidCredentials } from './erros/inavalid-credentials'

let usersRepository: InMenoryUsersRepository
let sut: AuthenticateUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMenoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    expect(() => sut.execute('lidia@teste.com', '123456')).not.toThrow()
  })

  it('should not be able to authenticate with wrong password', async () => {
    await expect(
      sut.execute('lidia@teste.com', 'wrongpassword'),
    ).rejects.toThrow(new InvalidCredentials())
  })

  it('should not be able to authenticate with wrong user', async () => {
    await expect(
      sut.execute('nonexistentuser@teste.com', '123456'),
    ).rejects.toThrow(new InvalidCredentials())
  })
})
