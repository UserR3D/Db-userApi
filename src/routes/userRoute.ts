import { FastifyInstance } from 'fastify';
import { getHandlerUsers } from '../controllers/userController';

async function Routes(route: FastifyInstance) {
  route.get('/user', getHandlerUsers);
}

export default Routes;
