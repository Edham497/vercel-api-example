import dotenv from "dotenv";
import consola from "consola";
import { configureExpress } from "./api/config/express.config";
import { configureApolloServer } from "./api/config/apollo.config";
import { connectDB } from "./api/config/mongo.config";
dotenv.config();

const port = process.env.PORT || 4000;

async function configure() {
  connectDB();
  const [app, httpServer] = configureExpress();
  await configureApolloServer(app, httpServer);

  httpServer.listen(port, async () => {
    consola.log(`Server at http://localhost:${port}`);
    consola.log(`Server at http://localhost:${port}/graphql`);
  });
}
configure();
