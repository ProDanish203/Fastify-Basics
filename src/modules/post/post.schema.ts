import { buildJsonSchemas } from "fastify-zod";
import z from "zod";

export const postSchema = z.object({
  caption: z.string({
    required_error: "Caption is required",
    invalid_type_error: "Caption must be a string",
  }),
});

const listPostQuerySchema = z.object({
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),
});

export type CreatePostInput = z.infer<typeof postSchema>;
export type ListPostQuery = z.infer<typeof listPostQuerySchema>;

export const { schemas: postSchemas, $ref } = buildJsonSchemas({
  postSchema,
});
