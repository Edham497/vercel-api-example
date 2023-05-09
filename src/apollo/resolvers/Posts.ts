import { Types } from "mongoose";
import PostModel from "../../models/posts";
import consola from "consola";

const Posts = async (_, params) => {
  const { page } = params;
  const posts = await PostModel.aggregate([
    { $sort: { createdAt: -1 } },
    { $skip: 10 * (page ?? 0) },
    { $limit: 10 },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $project: {
        files: 1,
        cover: 1,
        title: 1,
        description: 1,
        recipe: 1,
        category: 1,
        author: { $arrayElemAt: ["$author", 0] },
      },
    },
    {
      $project: {
        files: 1,
        cover: 1,
        title: 1,
        description: 1,
        recipe: 1,
        category: 1,
        "author._id": 1,
        "author.username": 1,
        "author.picture": 1,
      },
    },
  ]);

  return posts;
};

async function PostsByProfile(_, params) {
  const { page, id } = params;
  consola.info(`PostByProfileQuery for: ${params.id}`);
  try {
    const posts = await PostModel.aggregate([
      { $match: { author: new Types.ObjectId(id) } },
      { $sort: { createdAt: -1 } },
      { $skip: 10 * (page ?? 0) },
      { $limit: 10 },
      {
        $project: {
          files: 1,
          cover: 1,
          title: 1,
          description: 1,
          recipe: 1,
          category: 1,
        },
      },
    ]);
    return posts;
  } catch (error) {
    consola.error(error);
  }
}

const PostResolvers = {
  Query: {
    Posts,
    PostsByProfile,
  },
};

export default PostResolvers;
