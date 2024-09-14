import { FastifyInstance } from "fastify";
import {
  loginUserHandler,
  logoutHandler,
  registerUserHandler,
} from "./user.controller";

async function userRoutes(server: FastifyInstance) {
  server.post("/register", registerUserHandler);
  server.post("/login", loginUserHandler);
  server.post("/logout", logoutHandler);
}

export default userRoutes;
