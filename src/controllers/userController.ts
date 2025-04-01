import { FastifyReply, FastifyRequest } from 'fastify';
import { getUsers } from '../services/userServices';

export async function getHandlerUsers(request: FastifyRequest, reply: FastifyReply) {
  const users = await getUsers();
  reply.send(users);
}
