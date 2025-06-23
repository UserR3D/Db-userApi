import { $Enums, PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function getUsers() {
  return await prisma.user.findMany();
}

export async function getUser(id: number) {
  return await prisma.user.findUnique({
    where: { id },
    select: { email: true },
  });
}

export async function addUser(
  email: string,
  password: string,
  role: $Enums.Role
) {
  return await prisma.user.create({
    data: {
      email,
      password,
      role,
    },
  });
}

export async function updateUser(
  email: string,
  password: string,
  role: $Enums.Role,
  id: number
) {
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

export async function loginUser(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  const isMatch = user && (await bcrypt.compare(password, user.password));
  if (!user || !isMatch) {
    throw new Error("Invalid email or password");
  }
  const payload = {
    id: user.id,
    email: user.email,
  };
  return { user, isMatch, payload };
}
