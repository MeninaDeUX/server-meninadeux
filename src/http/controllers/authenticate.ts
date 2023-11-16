import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  try {
    const { email, password } = registerBodySchema.parse(request.body)

    const userRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRepository)

    const { user } = await authenticateUseCase.execute({ email, password })

    return reply.status(200).send({ user })
  } catch (error) {
    return reply.status(401).send({ message: error })
  }
}
