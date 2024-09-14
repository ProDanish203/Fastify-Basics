import { FastifyInstance } from "fastify";
import { createPostHandler } from "./post.controller";
import { $ref } from "./post.schema";

async function postRoutes(server: FastifyInstance) {
  server.post(
    "/",
    {
      // schema: {
      //   body: $ref("postSchema"),
      // },
    },
    createPostHandler
  );
}

export default postRoutes;
