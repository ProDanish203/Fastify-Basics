import { createServer } from "./server";
import { config } from "dotenv";
const server = createServer();

async function main() {
  try {
    config();
    const port = Number(process.env.PORT || 8000);
    await server.listen({
      port,
      host: "0.0.0.0",
    });

    server.log.info(`Server listening at http://localhost:${port}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}

main();
