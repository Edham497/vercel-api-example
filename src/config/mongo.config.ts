import mongoose from "mongoose";
import consola from "consola";

export async function connectDB() {
  try {
    // const { SB01_MONGO_DB, SB01_MONGO_USER, SB01_MONGO_PASS } = process.env;
    const { PROD_MONGO_DB, PROD_MONGO_SRV } = process.env;
    const uri = `mongodb+srv://${PROD_MONGO_SRV}/${PROD_MONGO_DB}`;

    const { PROD_MONGO_USER, PROD_MONGO_PASS } = process.env;
    await mongoose.connect(uri, {
      w: "majority",
      retryWrites: true,
      auth: { username: PROD_MONGO_USER, password: PROD_MONGO_PASS },
    });

    consola.success("Database connected");
  } catch (error) {
    consola.error(error);
    consola.error("Database error");
  }
}
