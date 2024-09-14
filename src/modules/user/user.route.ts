import { FastifyInstance } from "fastify";
import {
  allUsersHandler,
  loginUserHandler,
  logoutHandler,
  registerUserHandler,
} from "./user.controller";
import { $ref } from "./user.schema";

async function userRoutes(server: FastifyInstance) {
  server.post(
    "/register",
    {
      schema: {
        body: $ref("createUserSchema"),
        // response: {
        //   201: $ref("createUserResponseSchema"),
        // },
      },
    },
    registerUserHandler
  );
  server.post(
    "/login",
    {
      schema: {
        body: $ref("loginSchema"),
        // response: {
        //   200: $ref("loginResponseSchema"),
        // },
      },
    },
    loginUserHandler
  );
  server.post("/logout", logoutHandler);

  server.get("/", {
    preHandler: [server.authenticate],
  }, allUsersHandler);
}

export default userRoutes;
