import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { UpdateUseCase } from '../put-user'

export function makePutUserUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const putUserUseCase = new UpdateUseCase(usersRepository)

  return putUserUseCase
}
