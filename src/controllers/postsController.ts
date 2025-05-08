import { FastifyReply, FastifyRequest } from 'fastify';
import { addPost } from '../services/postsService';
import { postContent, userID } from '../utils/types';

export async function postCreate(request: FastifyRequest<{ Params: userID; Body: postContent }>, reply: FastifyReply) {
  const { id } = request.params;
  const postcreated = await addPost(request.body, +id);
  reply.send(postcreated);
}
