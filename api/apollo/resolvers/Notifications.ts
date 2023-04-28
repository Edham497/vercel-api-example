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

const NotificationResolvers = {
  Query: {
    Notifications,
  },
  Mutation: {
    CreateGlobalNotification,
  },
};

export default NotificationResolvers;
