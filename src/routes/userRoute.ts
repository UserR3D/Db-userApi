import { FastifyInstance } from 'fastify';
import { createHandlerUsers, getHandlerUsers } from '../controllers/userController';
import { postUser } from '../schemas/userSchema';

async function Routes(route: FastifyInstance) {
  route.get('/users', getHandlerUsers);
  route.post(
    '/createUser',
    {
      schema: {
        body: postUser,
      },
    },
    createHandlerUsers
  );
}

export default Routes;
