import { UsersRepository } from '@/repositories/users-respository'
import { compare } from 'bcryptjs'
import { InvalidCredentials } from './erros/inavalid-credentials'

export class AuthenticateUseCase {
  constructor(private userRepository: UsersRepository) {}

  async execute(email: string, password: string): Promise<void> {
    const user = await this.userRepository.findByEmail(email)

    if (user == null) {
      throw new InvalidCredentials()
    }

    const doesPasswordMatch = await compare(password, user.password_hash)
    console.log(doesPasswordMatch)

    if (!doesPasswordMatch) {
      throw new InvalidCredentials()
    }
  }
}
