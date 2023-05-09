import dotenv from "dotenv";
import { connectDB } from "../src/config/mongo.config";
import { configureExpress } from "../src/config/express.config";
import { configureApolloServer } from "../src/config/apollo4.config";
import { applyServerMiddleware } from "../src/config/middleware";
dotenv.config();
async function configure() {
  const server = await configureApolloServer(httpServer);
  applyServerMiddleware(app, server);
}

connectDB();
const { app, httpServer } = configureExpress();

configure();
export default httpServer;
