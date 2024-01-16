import { UserWithoutPassword } from '@/use-cases/get-users-profiles'
import { Prisma, User } from '@prisma/client'

export interface UsersRepository {
  create(data: Prisma.UserCreateInput): Promise<User>
  findByEmail(email: string): Promise<User | null>
  findMany(page: number): Promise<UserWithoutPassword>
  update(user: User): Promise<User>
}
