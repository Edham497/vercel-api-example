import dotenv from "dotenv";
import { connectDB } from "./config/mongo.config";
import { configureExpress } from "./config/express.config";
import { configureApolloServer } from "./config/apollo.config";

dotenv.config();
connectDB();

const [app, httpServer] = configureExpress();
configureApolloServer(app, httpServer);

export default httpServer;
