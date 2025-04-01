import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function Routes(route: FastifyInstance) {
  route.get('/user', async (request: FastifyRequest, reply: FastifyReply) => {
    const user = await prisma.user.findMany();
  });
}

export default Routes;
