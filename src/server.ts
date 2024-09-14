import Fastrify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt, { JWT } from "fastify-jwt";
import swagger from "fastify-swagger";
import dotenv from "dotenv";
import { withRefResolver } from "fastify-zod";
// Routes
import userRoutes from "./modules/user/user.route";
// import postRoutes from "./modules/post/post.route";

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
  export interface FastifyInstance {
    authenticate: any;
  }
}

declare module "fastify-jwt" {
  interface JWT {
    payload: { id: string; email: string };
  }
}

export function createServer() {
  dotenv.config();
  const server = Fastrify({ logger: true });

  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET!,
  });

  server.decorate(
    "authenticate",
    async function (request: FastifyRequest, reply: FastifyReply) {
      try {
        await request.jwtVerify();
      } catch (err) {
        return reply.send(err);
      }
    }
  );

  server.get("/", () => {
    return { message: "Fastify Basic REST API" };
  });

    server.register(userRoutes, { prefix: "api/v1/users" });
  //   server.register(postRoutes, { prefix: "api/v1/posts" });

  return server;
}
