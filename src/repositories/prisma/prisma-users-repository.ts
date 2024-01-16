import { prisma } from '@/lib/prisma'
import { Prisma, User } from '@prisma/client'
import { UsersRepository } from '../users-respository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })
    return user
  }

  async findMany(page: number) {
    const start = (page - 1) * 20
    const end = page * 20

    const users = await prisma.user.findMany({
      skip: start,
      take: end,
      select: {
        id: true,
        name: true,
        email: true,
        created_at: true,
      },
    })

    const result = {
      users,
      countUsers: (page - 1) * 20,
      numberPage: page,
    }

    return result
  }

  async update(user: Prisma.UserUpdadeInput) {
    const newUser = await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        name: user.name,
        password_hash: user.password_hash,
      },
    })

    return newUser
  }
}
