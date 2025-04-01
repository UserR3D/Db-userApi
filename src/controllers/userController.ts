import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser, getUsers } from '../services/userServices';

export async function getHandlerUsers(request: FastifyRequest, reply: FastifyReply) {
  const users = await getUsers();
  reply.send(users);
}

export async function createHandlerUsers(request: FastifyRequest, reply: FastifyReply) {
  const { email, password, role } = request.body;
  const createUser = await addUser(email, password, role);
  reply.send(createUser);
}
