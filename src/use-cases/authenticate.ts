import { User } from '@prisma/client'
import { InvalidCredentials } from './erros/inavalid-credentials'
import { compare } from 'bcryptjs'
import { UsersRepository } from '@/repositories/users-respository'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)

    if (!doesPasswordMatch) {
      throw new InvalidCredentials()
    }

    return { user }
  }
}
