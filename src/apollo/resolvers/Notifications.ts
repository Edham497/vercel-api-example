import { UserModel } from "../../models";
import NotificationModel from "../../models/notifications";

async function Notifications(_, params) {
  const { userId } = params;
  const notifications = await NotificationModel.find({
    $or: [{ isAppNotification: true }, { receiver: userId }],
  });
  return notifications;
}

async function CreateGlobalNotification(_, params) {
  const appNotificationBody = {
    title: "It's holiday season 🎄🎁❄️",
    message: "What treats have you been eating?",
    image: null,
  };

  await NotificationModel.create({
    appNotificationBody,
    isAppNotification: true,
    appNotificationId: "0421231635",
    type: "global",
  });

  return "notification created!";
}
async function CreateNotification(_, params) {
  try {
    let tokens = params.fcmt;
    // if (params.fcmt === "All devices") {
    //   const users = await UserModel.find();
    //   tokens = users
    //     .map((element) => element.firebaseToken)
    //     .filter((e) => e != null && e != undefined && e !== "");
    // }

    const response = await fetch("https://fcm.googleapis.com/fcm/send", {
      method: "POST",
      body: JSON.stringify({
        to: tokens,
        notification: {
          title: params.title,
          body: params.body,
        },
      }),
      headers: {
        Authorization: process.env.FIREBASE_KEY,
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      return "Notification sent";
    }
    throw Error();
  } catch (e) {
    console.log({ error: e });
    return "Notification error";
  }
}

const NotificationResolvers = {
  Query: {
    Notifications,
  },
  Mutation: {
    CreateGlobalNotification,
    CreateNotification,
  },
};

export default NotificationResolvers;
