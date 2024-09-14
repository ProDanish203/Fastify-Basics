import { FastifyReply, FastifyRequest } from "fastify";

export const registerUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {

  } catch (err) {
    return reply.send(err);
  }
};

export const loginUserHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
  } catch (err) {
    return reply.send(err);
  }
};

export const logoutHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
  } catch (err) {
    return reply.send(err);
  }
};
