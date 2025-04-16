import { FastifyInstance } from 'fastify';
import { createHandlerUsers, deleteHanlderUsers, getHandlerUsers, getLoginUser, updateHandlerUsers } from '../controllers/userController';
import { loginUserSchema, postUser } from '../schemas/userSchema';

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
  route.post('/login', { schema: { body: loginUserSchema } }, getLoginUser);
}

export default Routes;
