import {
  DocumentType,
  Severity,
  getModelForClass,
  modelOptions,
  prop,
} from "@typegoose/typegoose";
import { Schema, Types } from "mongoose";

class ServerProps {
  @prop({ type: String })
  public key: string;
  @prop({ type: Schema.Types.Mixed, allowMixed: Severity.ALLOW })
  public value: string | number | boolean;
}

const ServerPropsModel = getModelForClass(ServerProps, {
  schemaOptions: {
    timestamps: true,
    versionKey: false,
    //@ts-ignore
    skipVersioning: true,
  },
});

export default ServerPropsModel;
