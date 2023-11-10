import { describe, it, beforeEach, expect } from 'vitest'
import { hash } from 'bcryptjs'
import { InMenoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { GetUsersProfileUseCase } from './get-users-profiles'

let usersRepository: InMenoryUsersRepository
let sut: GetUsersProfileUseCase

describe('Get Users Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMenoryUsersRepository()
    sut = new GetUsersProfileUseCase(usersRepository)
  })

  it('should return an array with all users', async () => {
    await usersRepository.create({
      name: 'user-01',
      email: 'user-01@example.com',
      password_hash: await hash('123456', 6),
    })

    await usersRepository.create({
      name: 'user-02',
      email: 'user-02@example.com',
      password_hash: await hash('123456', 6),
    })

    const result = await sut.execute({
      page: 1,
    })

    expect(result).toHaveLength(2)
    expect(result).toEqual([
      expect.objectContaining({ name: 'user-01' }),
      expect.objectContaining({ name: 'user-02' }),
    ])
  })

  it('should return an array with all users', async () => {
    for (let i = 1; i <= 23; i++) {
      await usersRepository.create({
        name: `user-${i}`,
        email: `user-${i}@example.com`,
        password_hash: await hash('123456', 6),
      })
    }

    const result = await sut.execute({
      page: 2,
    })

    expect(result).toHaveLength(3)
    expect(result).toEqual([
      expect.objectContaining({ name: 'user-21' }),
      expect.objectContaining({ name: 'user-22' }),
      expect.objectContaining({ name: 'user-23' }),
    ])
  })
})
