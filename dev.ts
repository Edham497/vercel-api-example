import dotenv from "dotenv";
import consola from "consola";
import { connectDB } from "./api/config/mongo.config";
import { configureExpress } from "./api/config/express.config";
import { configureApolloServer } from "./api/config/apollo4.config";
import { applyServerMiddleware } from "./api/config/middleware";
dotenv.config();

const port = process.env.PORT || 4000;

async function configure() {
  const { app, httpServer } = configureExpress();
  const server = await configureApolloServer(httpServer);
  applyServerMiddleware(app, server);
  connectDB();

  httpServer.listen(port, async () => {
    consola.log(`Server at http://localhost:${port}`);
    consola.log(`Server at http://localhost:${port}/graphql`);
  });
}
configure();
