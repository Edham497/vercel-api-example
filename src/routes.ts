import { Router } from "express";
import UserModel from "./models/users";

const router = Router();

router.use("/hello", async (req, res) => {
  const users = await UserModel.find({});
  res.json({ users });
});

export default router;
