import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import userRoutes from './routes/userRoute';
('./routes/userRoute');
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import fastifyCookie from '@fastify/cookie';
import fjwt, { FastifyJWT } from '@fastify/jwt';
import postsRoute from './routes/postsRoute';
import cors from "@fastify/cors"

const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient();

server.register(fjwt, { secret: `${process.env.JWT_SECRET}` });
server.register(cors);

server.addHook('preHandler', (req, _res, next) => {
  req.jwt = server.jwt;
  return next();
});

server.register(fastifyCookie, {
  secret: `${process.env.FF_COOKIES_SECRET}`,
  hook: 'preHandler',
});

server.decorate('authenticate', async (request: FastifyRequest, reply: FastifyReply) => {
  const token = request.cookies.acess_token;
  if (!token) {
    return reply.status(401).send({ message: 'Authentication required' });
  }
  const decoded = request.jwt.verify<FastifyJWT['user']>(token);
  request.user = decoded;
});

async function main() {
  server.listen({ port: Number(process.env.PORT) || 3333 }, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${process.env.PORT}`);
  });
  server.register(userRoutes);
  server.register(postsRoute);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
