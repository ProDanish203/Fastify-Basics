import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt, { JWT } from "fastify-jwt";
import swagger from "fastify-swagger";
import dotenv from "dotenv";
import { withRefResolver } from "fastify-zod";
// Routes
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";
import { postSchemas } from "./modules/post/post.schema";
import postRoutes from "./modules/post/post.route";

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
  const server = Fastify({ logger: true });

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

  server.addHook("preHandler", (req, reply, next) => {
    req.jwt = server.jwt;
    return next();
  });

  for (const schema of [...userSchemas, ...postSchemas]) {
    try {
      server.addSchema(schema);
    } catch (error: any) {
      if (error.code === "FST_ERR_SCH_ALREADY_PRESENT") {
        console.warn(`Schema ${schema.$id} already present, skipping`);
      } else {
        throw error;
      }
    }
  }

  server.get("/", () => {
    return { message: "Fastify Basic REST API" };
  });

  server.register(userRoutes, { prefix: "api/v1/users" });
  server.register(postRoutes, { prefix: "api/v1/posts" });

  return server;
}
