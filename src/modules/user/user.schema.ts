import z from "zod";
import { buildJsonSchemas } from "fastify-zod";

const userBaseSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email({
      message: "Invalid email format",
    }),
  name: z.string().min(3).max(255).optional(),
});
const createUserSchema = z.object({
  ...userBaseSchema.shape,
  password: z
    .string({
      required_error: "Password is required",
      invalid_type_error: "Password must be a string",
    })
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(255, { message: "Password must be at most 255 characters long" }),
});

const createUserResponseSchema = z.object({
  ...userBaseSchema.shape,
  id: z.string(),
});

const loginSchema = z.object({
  email: createUserSchema.shape.email,
  password: createUserSchema.shape.password,
});

const loginResponseSchema = z.object({
  email: createUserSchema.shape.email,
  id: z.string(),
  name: z.string().min(3).max(255),
});

const listUserQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type LoginRequest = z.infer<typeof loginSchema>;
export type ListUserQuery = z.infer<typeof listUserQuerySchema>;

export const { schemas: userSchemas, $ref } = buildJsonSchemas({
  createUserSchema,
  loginSchema,
  createUserResponseSchema,
  loginResponseSchema,
});
