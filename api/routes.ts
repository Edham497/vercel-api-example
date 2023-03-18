import { Router } from "express";
import UserModel from "./models/users";

const router = Router();

router.use("/hello", async (req, res) => {
  res.json({ message: "Hello World from Vercel lml" });
});

export default router;
