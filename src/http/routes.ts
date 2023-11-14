import { getUsersProfile } from './controllers/get-users-profile'
import { register } from './controllers/register'
import { FastifyInstance } from 'fastify'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)
  app.get('/users', getUsersProfile)
}
