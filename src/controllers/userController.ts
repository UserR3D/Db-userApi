import { FastifyReply, FastifyRequest } from "fastify";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  loginUser,
  updateUser,
} from "../services/userServices";
import { bodyUser, userID } from "../utils/types";
import bcrypt from "bcryptjs";

export async function getHandlerUsers(
  _request: FastifyRequest,
  reply: FastifyReply
) {
  const users = await getUsers();
  reply.send(users);
}

export async function getHandlerUser(
  request: FastifyRequest<{ Params: userID }>,
  reply: FastifyReply
) {
  const param = Number(request.params.id);
  const user = await getUser(param);
  reply.send(user);
}

export async function createHandlerUsers(
  request: FastifyRequest<{ Params: userID; Body: bodyUser }>,
  reply: FastifyReply
) {
  const { email, password, role } = request.body;
  const passswordHash = await bcrypt.hash(password, 10);
  const createUser = await addUser(email, passswordHash, role);
  reply.send(createUser);
}

export async function updateHandlerUsers(
  request: FastifyRequest<{ Params: userID; Body: bodyUser }>,
  reply: FastifyReply
) {
  const { email, password, role } = request.body;
  const { id } = request.params;
  const passswordHash = await bcrypt.hash(password, 10);
  const changeUser = await updateUser(email, passswordHash, role, +id);
  reply.send(changeUser);
}

export async function deleteHanlderUsers(
  request: FastifyRequest<{ Params: userID }>,
  reply: FastifyReply
) {
  const { id } = request.params;
  const eraseUser = await deleteUser(+id);
  reply.send(eraseUser);
}

export async function getLoginUser(
  request: FastifyRequest<{ Body: bodyUser }>,
  reply: FastifyReply
) {
  try {
    const { email, password } = request.body;
    const userPayload = await loginUser(email, password);
    if (!userPayload.isMatch || !userPayload.user) {
      throw new Error("Invalid email or password");
    }
    const token = request.jwt.sign(userPayload);
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    reply.setCookie("__Secure_acess_token__", token, {
      path: "/",
      httpOnly: true,
      secure: true,
      expires: expires,
    });
    reply.send(userPayload.payload);
  } catch (e) {
    reply.code(401).send(e);
  }
}

export async function logout(_request: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie("__Secure_acess_token__");
  return reply.send({ message: "Logout successful" });
}
