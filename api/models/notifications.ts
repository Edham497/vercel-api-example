import { Schema, model } from "mongoose";

const NotificationSchema = new Schema({
  isAppNotification: { type: Boolean, default: false },
  appNotificationId: { type: String, default: null },
  appNotificationBody: {
    title: String,
    message: String,
    image: String,
  },
  read: { type: Boolean, default: false },
  type: { type: String },
  post: { type: Schema.Types.ObjectId },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  receiver: { type: Schema.Types.ObjectId, ref: "User" },
})
  //@ts-ignore
  .set("skipVersioning", true)
  .set("versionKey", false)
  .set("timestamps", {
    createdAt: true,
    updatedAt: false,
  });

const NotificationModel = model("Notification", NotificationSchema);

export default NotificationModel;
