import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-respository'
import { randomUUID } from 'crypto'

export class InMenoryUsersRepository implements UsersRepository {
  public data: User[] = []

  async findByEmail(email: string) {
    const user = this.data.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }
    this.data.push(user)
    return user
  }

  async update(user: Prisma.UserUpdadeInput) {
    const newUser = {
      id: randomUUID(),
      name: user.name,
      password_hash: user.password_hash,
      email: user.email,
      created_at: new Date(),
    }
    this.data.push(newUser)
    return newUser
  }

  async findMany(page: number) {
    const users = this.data
      .map(({ password_hash, ...rest }) => rest)
      .slice((page - 1) * 20, page * 20)

    const result = {
      users,
      countUsers: (page - 1) * 20,
      numberPage: page,
    }

    return result
  }
}
