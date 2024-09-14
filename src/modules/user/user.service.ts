import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma";
import { CreateUserInput } from "./user.schema";

export const createUser = async ({
  email,
  name,
  password,
}: CreateUserInput) => {
  const { hash, salt } = hashPassword(password);

  const existingUser = await checkExistingUser(email);
  if (existingUser) return null;

  const user = await prisma.user.create({
    data: {
      email,
      name,
      password: hash,
      salt,
    },
  });
  return user;
};

export const checkExistingUser = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const findUserByEmail = async (email: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
};

export const listUsers = async ({
  page = 1,
  limit = 10,
}: {
  page?: number;
  limit?: number;
}) => {
  const users = await prisma.user.findMany({
    skip: (page - 1) * limit || 0,
    take: limit || 10,
    select: {
      password: false,
      salt: false,
      email: true,
      name: true,
      id: true,
    },
  });
  return users;
};
