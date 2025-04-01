import fastify from 'fastify';
import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import Routes from './routes/userRoute';

const server = fastify();
const prisma = new PrismaClient();

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
