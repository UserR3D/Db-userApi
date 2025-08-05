import { FastifyReply, FastifyRequest } from "fastify";
import {
  addPost,
  getOnlyPost,
  getPost,
  getPostsUser,
} from "../services/postsService";
import { postContent, userID } from "../utils/types";
import { postUser } from "../schemas/userSchema";

export async function postCreate(
  request: FastifyRequest<{ Body: postContent }>,
  reply: FastifyReply
) {
  const postCreated = await addPost(request.body, request.userApi.user.id);
  reply.send(postCreated);
}

export async function getHandlerPosts(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const getPosts = await getPost();
  reply.send(getPosts);
}

export async function getHandlerPost(
  request: FastifyRequest<{ Params: userID }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const findPost = await getOnlyPost(+id);
  reply.send(findPost);
}

export async function getPostUser(
  request: FastifyRequest<{ Params: userID }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const postsUser = await getPostsUser(+id);
  reply.send(postsUser);
}
