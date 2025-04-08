import { FastifyReply, FastifyRequest } from 'fastify';
import { addUser, deleteUser, getUsers, updateUser } from '../services/userServices';
import { bodyUser } from '../utils/types';

export async function getHandlerUsers(_request: FastifyRequest, reply: FastifyReply) {
  const users = await getUsers();
  reply.send(users);
}

export async function createHandlerUsers(request: FastifyRequest, reply: FastifyReply) {
  const { email, password, role } = request.body as bodyUser;
  const createUser = await addUser(email, password, role);
  reply.send(createUser);
}

export async function updateHandlerUsers(request: FastifyRequest, reply: FastifyReply) {
  const { email, password, role } = request.body as bodyUser;
  const { id }: any = request.params;
  const changeUser = await updateUser(email, password, role, +id);
  reply.send(changeUser);
}

export async function deleteHanlderUsers(request: FastifyRequest, reply: FastifyReply) {
  const { id }: any = request.params;
  const eraseUser = await deleteUser(+id);
  reply.send(eraseUser);
}
