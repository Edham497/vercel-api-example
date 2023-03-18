import dotenv from "dotenv";
import consola from "consola";
import { configureExpress } from "./src/config/express.config";
import configureApolloServer from "./src/config/apollo.config";
import { connectDB } from "./src/config/mongo.config";
dotenv.config();

async function configure() {
  connectDB();
  const [app, port] = await configureExpress();
  const [server, apollo] = await configureApolloServer(app);

  server.listen({ port }, async () => {
    consola.log(`Server at http://localhost:${port}${apollo.graphqlPath}`);
    consola.log(`Server at http://localhost:${port}`);
  });
}
configure();
