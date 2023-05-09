import { getModelForClass } from "@typegoose/typegoose";
import { User } from "./users";
import { Wallet } from "./wallet";

export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});

export const WalletModel = getModelForClass(Wallet);
