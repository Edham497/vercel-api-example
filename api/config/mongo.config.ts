import mongoose, { ConnectOptions } from "mongoose";
import consola from "consola";

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
