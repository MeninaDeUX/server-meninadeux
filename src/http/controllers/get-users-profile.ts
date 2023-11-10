import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetUsersUseCase } from '@/use-cases/factories/make-get-users-profile-use-case '
import { z } from 'zod'

export async function getUsersProfile(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getUsersProfileBodySchema = z.object({
    page: z.number().min(1).default(1),
  })

  const { page } = getUsersProfileBodySchema.parse(request.query)

  try {
    const getUsersProfileUseCase = makeGetUsersUseCase()
    const result = await getUsersProfileUseCase.execute({ page })
    return reply.status(200).send({
      users: result,
      countUsers: (page - 1) * 20,
      numberPage: page,
    })
  } catch (error) {
    return reply.status(500).send(error)
  }
}
