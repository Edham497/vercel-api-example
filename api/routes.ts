import { Router } from "express";
import PostModel from "./models/posts";

const router = Router();

router.use("/hello", async (req, res) => {
  res.json({ message: "Hello World from Vercel lml" });
});

router.use("/post/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: "post not found." });
  }
});

router.use("/post", async (req, res) => {
  try {
    const postCount = await PostModel.countDocuments();
    const post = await PostModel.findOne().skip(
      Math.floor(Math.random() * postCount)
    );
    res.json(post);
  } catch (e) {
    res.status(400).json({ error: "post not found." });
  }
});

export default router;
