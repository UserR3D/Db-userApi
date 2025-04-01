import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function addUser(email, password, role) {
  return await prisma.user.create({
    data: {
      email: email,
      password: password,
      role: role,
    },
  });
}
