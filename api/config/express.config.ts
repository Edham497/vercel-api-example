import http from "http";
import express, { Express } from "express";
import cors from "cors";
// import routes from "../routes";
type ExpressApp = {
  app: Express;
  httpServer: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
};

export function configureExpress(): ExpressApp {
  const app = express();
  const CORS = cors();
  const JSON = express.json();

  app.use(CORS, JSON);
  // app.use("/", routes);

  const httpServer = http.createServer(app);
  return { app, httpServer };
}
