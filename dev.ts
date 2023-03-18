import dotenv from "dotenv";
import consola from "consola";
import { configureExpress } from "./api/config/express.config";
import configureApolloServer from "./api/config/apollo.config";
import { connectDB } from "./api/config/mongo.config";
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
