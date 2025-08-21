import { FastifyInstance } from "fastify";
import {
  getHandlerPost,
  getHandlerPosts,
  getPostUser,
  postCreate,
} from "../controllers/postsController";
import { postDbSchema } from "../schemas/userSchema";
async function postsRoute(route: FastifyInstance) {
  route.post(
    "/users/createPost",
    { preHandler: [route.authenticate], schema: { body: postDbSchema } },
    postCreate
  );
  route.get("/users/posts", getHandlerPosts);
  route.get("/users/posts/:id", getHandlerPost);
  route.get("/user/posts/:id", getPostUser);
}

export default postsRoute;
