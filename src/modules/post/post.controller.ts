import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePostInput } from "./post.schema";
import { createPost } from "./post.service";

export const createPostHandler = async (
  request: FastifyRequest<{ Body: CreatePostInput }>,
  reply: FastifyReply
) => {
  try {
    const { caption } = request.body;
    const user = request.user;
    console.log(user);
    // const post = await createPost(request.body, 123);
  } catch (err) {
    return reply.send(err);
  }
};

export const listAllPostsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
  } catch (err) {
    return reply.send(err);
  }
};

export const listUserPostsHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
  } catch (err) {
    return reply.send(err);
  }
};

export const listSinglePostHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
  } catch (err) {
    return reply.send(err);
  }
};
