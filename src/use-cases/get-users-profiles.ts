import { UsersRepository } from '@/repositories/users-respository'
import { User } from '@prisma/client'

interface GetUserProfileUseCaseRequest {
  page: number
}

export type UserWithoutPassword = Omit<User, 'password_hash'>

export class GetUsersProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}

  async execute({
    page,
  }: GetUserProfileUseCaseRequest): Promise<UserWithoutPassword[]> {
    const users = await this.usersRepository.findMany(page)
    return users
  }
}
