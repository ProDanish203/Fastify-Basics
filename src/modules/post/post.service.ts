import prisma from "../../utils/prisma";
import { CreatePostInput } from "./post.schema";

export const createPost = async (data: CreatePostInput, userId: string) => {
  const post = await prisma.post.create({
    data: {
      caption: data.caption,
      userId,
    },
  });

  return post;
};

export const listPosts = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const posts = await prisma.post.findMany({
    skip: (page - 1) * limit || 0,
    take: limit || 10,
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
    },
  });

  return posts;
};
