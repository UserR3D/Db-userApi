import { $Enums, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function addUser(email: string, password: string, role: $Enums.Role) {
  return await prisma.user.create({
    data: {
      email,
      password,
      role,
    },
  });
}

export async function updateUser(email: string, password: string, role: $Enums.Role, id: number) {
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

export async function deleteUser(id: number) {
  return await prisma.user.delete({
    where: {
      id,
    },
  });
}
