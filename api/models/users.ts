import {
  DocumentType,
  Ref,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import { Wallet, WalletModel } from "./wallet";

export class User {
  @prop()
  public name?: string;
  @prop()
  public description?: string;
  @prop()
  public provider?: string;
  @prop()
  public picture?: string;
  @prop({ required: true, unique: true })
  public username!: string;
  @prop({ required: true, unique: true })
  public email!: string;
  @prop({ required: true })
  public pass!: string;
  @prop({ ref: () => Wallet })
  public walletId?: Ref<Wallet>;
  @prop({ required: true })
  public fcmt!: string;
  @prop({ required: true })
  public fcmid!: string;

  public async createWalletForUser(this: UserDocument) {
    let wallet = new WalletModel({ userId: this._id });
    this.walletId = wallet._id;
    wallet.save();
    await this.save();
  }

  public async setFirebaseToken(this: UserDocument, token: string) {
    this.fcmt = token;
    await this.save();
  }

  public async setFirebaseId(this: UserDocument, id: string) {
    this.fcmid = id;
    await this.save();
  }

  public async setFirebaseData(this: UserDocument, id: string, token: string) {
    this.fcmid = id;
    this.fcmt = token;
  }
}

export type UserDocument = DocumentType<User>;
export const UserModel = getModelForClass(User, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
  },
});
