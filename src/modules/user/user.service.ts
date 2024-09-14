import prisma from "../../utils/prisma";

export const createUser = async ({
  email,
  name,
  password,
  salt
}: {
  email: string;
  name?: string;
  password: string;
  salt: string;
}) => {
  const user = await prisma.user.create({
    data: {
      email,
      name,
      password,
      salt
    },
  });
};
