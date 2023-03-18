import app from "./api/index";
import consola from "consola";
import dotenv from "dotenv";
dotenv.config();

app.listen(3000, () => consola.success("Server started"));
