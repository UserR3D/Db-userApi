import { FastifyInstance } from 'fastify';
import { createHandlerUsers, deleteHanlderUsers, getHandlerUsers, updateHandlerUsers } from '../controllers/userController';
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
  route.put('/updateUser/:id', updateHandlerUsers);
  route.delete('/deleteUser/:id', deleteHanlderUsers);
}

export default Routes;
