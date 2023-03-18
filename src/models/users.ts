import { Schema, InferSchemaType, model } from "mongoose";

const schema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  // phone: { type: String, unique: true, default: null },
  name: { type: String, required: true },
  provider: { type: String },
  description: { type: String, default: null },
  picture: {
    type: String,
    default: "https://kitchitfiles.s3.us-east-2.amazonaws.com/default.png",
  },
  pass: { type: String, required: true },
  firebaseToken: { type: String },
  balance: { type: Number, default: 0 },
  posts: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  status: { type: Boolean, default: true },
  fcmid: { type: String, required: false },
  wallet_id: { type: Schema.Types.ObjectId, ref: "Wallet" },
});

// @ts-ignore
schema.set("skipVersioning", true);
schema.set("timestamps", true);
schema.set("versionKey", false);

type User = InferSchemaType<typeof schema>;

const UserModel = model("User", schema);
export default UserModel;
