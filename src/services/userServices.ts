import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function addUser(email, password, role) {
  return await prisma.user.create({
    data: {
      email,
      password,
      role,
    },
  });
}

export async function updateUser(email, password, role, id) {
  return await prisma.user.update({
    where: {
      id,
    },
    data: {
      email,
      password,
      role,
    },
  });
}
