import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
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

    return users
  }
}
