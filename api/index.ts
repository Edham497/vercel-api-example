import dotenv from "dotenv";
import { connectDB } from "../src/config/mongo.config";
import { configureExpress } from "../src/config/express.config";
import { configureApolloServer } from "../src/config/apollo4.config";
dotenv.config();

connectDB();
const { app, httpServer } = configureExpress();
configureApolloServer(app, httpServer);

export default httpServer;
