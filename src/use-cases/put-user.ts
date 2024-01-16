import { UsersRepository } from '@/repositories/users-respository'
import { UserDontExistsError } from './erros/user-dont-exists-error'
import { hash } from 'bcryptjs'
import { User } from '@prisma/client'

interface UpdateUseCaseRequest {
  name: string
  password: string
  email: string
}

interface UpdateUseCaseResponse {
  user: User
}

export class UpdateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    name,
    password,
    email,
  }: UpdateUseCaseRequest): Promise<UpdateUseCaseResponse> {
    const existingUser = await this.usersRepository.findByEmail(email)

    if (!existingUser) {
      throw new UserDontExistsError()
    }

    if (name) {
      existingUser.name = name
    }

    if (password) {
      existingUser.password_hash = await hash(password, 6)
    }

    const updatedUser = await this.usersRepository.update(existingUser)

    return { user: updatedUser }
  }
}
