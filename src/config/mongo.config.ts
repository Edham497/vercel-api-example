import mongoose from "mongoose";
import consola from "consola";

export async function connectDB() {
  try {
    const [SB01_MONGO_DB, SB01_MONGO_USER, SB01_MONGO_PASS] = [
      "kitchit",
      "sb01",
      "NAbRgfqIkTyxFd3z",
    ];
    const uri = "mongodb+srv://cluster0.3vprcjm.mongodb.net/" + SB01_MONGO_DB;

    await mongoose.connect(uri, {
      w: "majority",
      retryWrites: true,
      auth: { username: SB01_MONGO_USER, password: SB01_MONGO_PASS },
    });

    consola.success("Database connected");
  } catch (error) {
    consola.error("Database error");
  }
}
