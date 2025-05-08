import { FastifyReply, FastifyRequest } from 'fastify';
import { addPost, getPost } from '../services/postsService';
import { postContent, userID } from '../utils/types';

export async function postCreate(request: FastifyRequest<{ Params: userID; Body: postContent }>, reply: FastifyReply) {
  const { id } = request.params;
  const postcreated = await addPost(request.body, +id);
  reply.send(postcreated);
}

export async function getHandlerPosts(_request: FastifyRequest, reply: FastifyReply) {
  const getPosts = await getPost();
  reply.send(getPosts);
}
