import { PrismaClient } from "@prisma/client";
import { postBase } from "../utils/types";

const prisma = new PrismaClient();

export async function addPost(
  { content, title, published }: postBase,
  id: number
) {
  return await prisma.post.create({
    data: {
      content,
      title,
      published,
      author: {
        connect: {
          id,
        },
      },
    },
  });
}

export async function getPost() {
  return await prisma.post.findMany({
    include: { author: { select: { email: true, role: true } } },
  });
}
