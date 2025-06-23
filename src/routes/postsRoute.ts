import { FastifyInstance } from "fastify";
import { getHandlerPosts, postCreate } from "../controllers/postsController";
import { postDbSchema } from "../schemas/userSchema";
async function postsRoute(route: FastifyInstance) {
  route.post("/users/:id/post", { schema: { body: postDbSchema } }, postCreate);
  route.get("/users/posts", getHandlerPosts);
}

export default postsRoute;
