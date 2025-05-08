import { FastifyInstance } from 'fastify';
import { postCreate } from '../controllers/postsController';
import { postDbSchema } from '../schemas/userSchema';
async function postsRoute(route: FastifyInstance) {
  route.post('/user/:id/post', { schema: { body: postDbSchema } }, postCreate);
}

export default postsRoute;
