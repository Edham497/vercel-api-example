import { Types } from "mongoose";
import consola from "consola";
import { PostModel } from "../../models";

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

async function AnalyticsPostsByCategory(_, params) {
  const posts = await PostModel.aggregate([
    { $group: { _id: "$category", count: { $sum: 1 } } },
    { $project: { _id: 0, category: "$_id", count: 1 } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);
  return posts;
}

async function AnalyticsPostsByUser(_, params) {
  const posts = await PostModel.aggregate([
    { $group: { _id: "$author", count: { $sum: 1 } } },
    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "username",
        pipeline: [{ $project: { _id: 0, username: 1 } }],
      },
    },
    { $project: { username: { $arrayElemAt: ["$username", 0] }, count: 1 } },
    { $project: { username: "$username.username", count: 1 } },
    { $sort: { count: -1 } },
    { $limit: 20 },
  ]);
  console.log(posts);
  return posts;
}

const PostResolvers = {
  Query: {
    Posts,
    PostsByProfile,
    AnalyticsPostsByCategory,
    AnalyticsPostsByUser,
  },
};

export default PostResolvers;
