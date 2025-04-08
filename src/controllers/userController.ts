import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser, getUsers, updateUser } from '../services/userServices';

export async function getHandlerUsers(_request: FastifyRequest, reply: FastifyReply) {
  const users = await getUsers();
  reply.send(users);
}

export async function createHandlerUsers(request: FastifyRequest, reply: FastifyReply) {
  const { email, password, role } = request.body;
  const createUser = await addUser(email, password, role);
  reply.send(createUser);
}

export async function updateHandlerUsers(request: FastifyRequest, reply: FastifyReply) {
  const { email, password, role } = request.body;
  const id = request.params.id;
  const changeUser = await updateUser(email, password, role, +id);
  reply.send(changeUser);
}
