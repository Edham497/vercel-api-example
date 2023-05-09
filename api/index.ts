import dotenv from "dotenv";
import { connectDB } from "./config/mongo.config";
import { configureExpress } from "./config/express.config";
import { configureApolloServer } from "./config/apollo4.config";
import { applyServerMiddleware } from "./config/middleware";

dotenv.config();
connectDB();

const { app, httpServer } = configureExpress();
const server = await configureApolloServer(httpServer);
applyServerMiddleware(app, server);

export default httpServer;
