import dotenv from "dotenv";
import consola from "consola";
import { connectDB } from "./src/config/mongo.config";
import { configureExpress } from "./src/config/express.config";
import { configureApolloServer } from "./src/config/apollo4.config";
import { applyServerMiddleware } from "./src/config/middleware";
dotenv.config();

const port = process.env.PORT || 4000;

async function configure() {
  connectDB();
  const { app, httpServer } = configureExpress();
  configureApolloServer(app, httpServer);

  httpServer.listen(port, async () => {
    consola.log(`Server at http://localhost:${port}`);
    consola.log(`Server at http://localhost:${port}/graphql`);
  });
}
configure();
