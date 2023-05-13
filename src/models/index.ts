import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./users";
import { Wallet } from "./wallet";
import { Post, Recipe } from "./posts";

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});

export const WalletModel = getModelForClass(Wallet);

export const RecipeModel = getModelForClass(Recipe, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
export const PostModel = getModelForClass(Post, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
