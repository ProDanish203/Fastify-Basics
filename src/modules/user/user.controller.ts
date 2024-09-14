import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, ListUserQuery, LoginRequest } from "./user.schema";
import { createUser, findUserByEmail, listUsers } from "./user.service";
import { verifyPassword } from "../../utils/hash";

export const registerUserHandler = async (
  request: FastifyRequest<{
    Body: CreateUserInput;
  }>,
  reply: FastifyReply
) => {
  try {
    const { email, name, password } = request.body;

    const user = await createUser({ email, name, password });
    if (!user) return reply.code(400).send({ message: "User already exists" });

    return reply
      .code(201)
      .send({ data: user, message: "User created successfully" });
  } catch (err) {
    return reply.code(500).send(err);
  }
};

export const loginUserHandler = async (
  request: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply
) => {
  try {
    const { email, password } = request.body;
    const userExists = await findUserByEmail(email);
    if (!userExists)
      return reply.code(404).send({ message: "Invalid Credentials" });

    // Verify Password
    const isValidPassword = verifyPassword({
      password,
      hash: userExists.password,
      salt: userExists.salt,
    });

    if (!isValidPassword)
      return reply.code(404).send({ message: "Invalid Credentials" });

    // Generate JWT Token
    const token = request.jwt.sign({
      id: userExists.id,
      email: userExists.email,
    });

    return reply
      .code(200)
      .send({ token, data: userExists, message: "Login successfull" });
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

export const allUsersHandler = async (
  request: FastifyRequest<{ Querystring: ListUserQuery }>,
  reply: FastifyReply
) => {
  try {
    const { page, limit } = request.query;
    const users = await listUsers({ page: Number(page), limit: Number(limit) });

    if (!users) return reply.code(404).send({ message: "No users found" });

    return reply.code(200).send({ data: users });
  } catch (err) {
    return reply.send(err);
  }
};
