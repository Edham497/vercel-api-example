import http from "http";
import express, { Express } from "express";
import cors from "cors";
import routes from "../routes";
type ExpressApp = [Express, any];

export function configureExpress(): ExpressApp {
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  app.use("/", routes);

  const httpServer = http.createServer(app);
  return [app, httpServer];
}
