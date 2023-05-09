import { DocumentType, getModelForClass, prop } from "@typegoose/typegoose";
import { User } from "./users";

export class Wallet {
  @prop({ required: true, ref: () => User })
  userId!: String;

  @prop({ default: 0 })
  balance: Number;

  @prop()
  customer?: String;
}

export type WalletDocument = DocumentType<Wallet>;

export const WalletModel = getModelForClass(Wallet);
