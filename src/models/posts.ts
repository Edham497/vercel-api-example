import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recipe: {
      type: Schema.Types.ObjectId,
      ref: "Recipe",
      default: null,
    },
    title: String,
    description: String,
    cover: String,
    files: {
      type: [String],
    },
    hashtags: {
      type: [String],
      default: [],
    },
    category: String,
    likes: {
      type: Number,
      default: 0,
    },
    comments: {
      type: Number,
      default: 0,
    },
    mentions: {
      type: [Schema.Types.ObjectId],
      default: [],
      ref: "User",
    },
    location: {
      name: { type: String, default: null },
      coords: {
        lat: { type: Number, default: null },
        lon: { type: Number, default: null },
      },
    },
  },
  {
    // @ts-ignore
    skipVersioning: true,
    timestamps: true,
    versionKey: false,
  }
);

const PostModel = model("Post", schema);
export default PostModel;
