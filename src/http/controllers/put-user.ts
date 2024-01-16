import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makePutUserUseCase } from '@/use-cases/factories/make-put-user-use-case'

export async function putUser(request: FastifyRequest, reply: FastifyReply) {
  const resgiterBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = resgiterBodySchema.parse(request.body)

  try {
    const UpdateUseCase = makePutUserUseCase()
    await UpdateUseCase.execute({ name, password, email })
  } catch (error) {
    return reply.status(400).send(error)
  }
  return reply.status(201)
}
