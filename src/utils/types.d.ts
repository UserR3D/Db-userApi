import { JWT } from "@fastify/jwt";
import { $Enums } from "@prisma/client";

interface bodyUser {
  id: number;
  email: string;
  password: string;
  role: $Enums.Role;
}

interface postContent {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorID: number;
}

type postBase = {
  title: string;
  content: string;
  published: boolean;
};

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

type userID = {
  id: number;
};

type UserPayload = {
  user: {
    id: number;
    email: string;
  };
};

declare module "@fastify/jwt" {
  interface FastifyJWT {
    userApi: UserPayload;
  }
}
