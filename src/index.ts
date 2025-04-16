import fastify from 'fastify';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import Routes from './routes/userRoute';
import { serializerCompiler, validatorCompiler, ZodTypeProvider } from 'fastify-type-provider-zod';
import fastifyCookie from '@fastify/cookie';
import fjwt from '@fastify/jwt';

const server = fastify({ logger: true }).withTypeProvider<ZodTypeProvider>();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

const prisma = new PrismaClient();

server.register(fjwt, { secret: `${process.env.JWT_SECRET}` });

server.addHook('preHandler', (req, _res, next) => {
  req.jwt = server.jwt;
  return next();
});

server.register(fastifyCookie, {
  secret: 'secret-key',
  hook: 'preHandler',
});

async function main() {
  server.listen({ port: Number(process.env.PORT) || 3333 }, (err) => {
    if (err) throw err;
    console.log(`Server listening on ${process.env.PORT}`);
  });
  server.register(Routes);
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
