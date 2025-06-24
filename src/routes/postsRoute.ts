import { FastifyInstance } from "fastify";
import {
  getHandlerPost,
  getHandlerPosts,
  postCreate,
} from "../controllers/postsController";
import { postDbSchema } from "../schemas/userSchema";
async function postsRoute(route: FastifyInstance) {
  route.post(
    "/users/post",
    { preHandler: [route.authenticate], schema: { body: postDbSchema } },
    postCreate
  );
  route.get("/users/posts", getHandlerPosts);
  route.get("/users/posts/:id", getHandlerPost);
}

export default postsRoute;
