import express, { Express } from "express";
import cors from "cors";
import routes from "../routes";
const port = process.env.PORT || 3000;
type ExpressApp = Promise<[Express, number | string]>;

export async function configureExpress(): ExpressApp {
  const app: Express = express();
  app.use(cors());
  app.use(express.json());
  app.use("/", routes);

  return [app, port];
}
