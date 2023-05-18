import {
  DocumentType,
  Ref,
  getModelForClass,
  prop,
} from "@typegoose/typegoose";
import { Wallet } from "./wallet";
import { TimeStamps } from "@typegoose/typegoose/lib/defaultClasses";

const defaultImage =
  "https://kitchitfiles.s3.us-east-2.amazonaws.com/default.png";

export class User extends TimeStamps {
  @prop({ required: true, unique: true })
  public username!: string;
  @prop({ required: true, unique: true })
  public email!: string;
  @prop()
  public name?: string;
  @prop()
  public provider?: string;
  @prop()
  public description?: string;
  @prop({ default: defaultImage })
  public picture?: string;
  @prop({ required: true })
  public pass!: string;
  @prop({ required: true })
  public fcmt!: string;
  @prop({})
  public firebaseToken!: string;
  @prop({ required: true })
  public fcmid!: string;
  @prop({ ref: () => Wallet })
  public walletId?: Ref<Wallet>;
  @prop()
  public lastLogin?: String;

  // public async createWalletForUser(this: UserDocument) {
  //   let wallet = new WalletModel({ userId: this._id });
  //   this.walletId = wallet._id;
  //   wallet.save();
  //   await this.save();
  // }

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
