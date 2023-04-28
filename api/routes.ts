import { Router } from "express";
import PostModel from "./models/posts";
import UserModel from "./models/users";

const router = Router();

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

router.get("/UserStats/:year", async (req, res) => {
  const year = Number(req.params.year) ?? 2022;
  const data = await UserModel.find(
    {
      createdAt: {
        $gte: new Date(year, 1, 1),
        $lt: new Date(year, 12, 31),
      },
    },
    { createdAt: 1 }
  );
  const stats = Array(12).fill(0);
  data.forEach((e) => {
    const date = new Date(e.createdAt);
    const month = date.getMonth();
    stats[month] += 1;
  });
  res.json({
    name: `Accounsts created on ${year}`,
    data: stats,
    total: data.length,
  });
});

export default router;
