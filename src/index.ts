import fastify, {
  FastifyInstance,
  FastifyRequest,
  FastifyReply,
} from "fastify";

const app: FastifyInstance = fastify({
    logger: true,
});

app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
  return { hello: "world" };
});

app.listen(8000, (err, address) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
  app.log.info(`Server listening at ${address}`);
});
