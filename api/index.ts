import mongoose, { ConnectOptions } from "mongoose";
import express, { Express, Router } from "express";
import consola from "consola";
import UserModel from "../src/models/users";

const MONGO_DB = "kitchit";
const MONGO_USER = "kitchit-dev";
const MONGO_PASS = "kitchit04012K21";

export async function connectDB() {
  try {
    const options: ConnectOptions = {
      w: "majority",
      retryWrites: true,
      dbName: MONGO_DB,
      auth: { username: MONGO_USER, password: MONGO_PASS },
    };

    await mongoose.connect(
      "mongodb+srv://cluster0.xdmjd.mongodb.net/",
      options
    );
    consola.success("Database connected");
  } catch (error) {
    console.error("Database error");
  }
}

const port = process.env.PORT || 3000;

connectDB();

const app: Express = express();
app.use(express.json());

const router = Router();

router.use("/hello", async (req, res) => {
  const users = await UserModel.find({});
  res.json({ users });
});

app.use("/", router);

export default app;
