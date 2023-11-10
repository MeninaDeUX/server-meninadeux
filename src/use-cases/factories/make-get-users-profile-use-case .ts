import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { GetUsersProfileUseCase } from '../get-users-profiles'

export function makeGetUsersUseCase() {
  const usersRepository = new PrismaUsersRepository()
  const getUserProfileUseCase = new GetUsersProfileUseCase(usersRepository)

  return getUserProfileUseCase
}
