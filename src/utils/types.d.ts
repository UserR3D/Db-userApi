import { JWT } from '@fastify/jwt';
import { $Enums } from '@prisma/client';

interface bodyUser {
  id: number;
  email: string;
  password: string;
  role: $Enums.Role;
}

declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT;
  }
}
