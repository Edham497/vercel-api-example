import { merge } from "lodash";
import PostResolvers from "./Posts";
import ProfileResolvers from "./Profile";
import NotificationResolvers from "./Notifications";
import UserResolvers from "./Users";
import ServerPropsModel from "../../models/ServerProps";

const GeneralResolvers = {
  Query: {
    HelloMessage: () => "Hello World",
    ServerConfig: async () => {
      const props = await ServerPropsModel.find(
        {},
        { _id: 0, key: 1, value: 1 }
      );
      let sc = new Object();
      props.forEach((e) => {
        sc[e.key] = e.value;
      });
      return sc;
    },
  },
  Mutation: {
    ShowMainMessage: async (_, { show }) => {
      try {
        await ServerPropsModel.findOneAndUpdate(
          { key: "sc_show_main_msg" },
          { $set: { value: show } }
        );
        return "Settings changed successfully.";
      } catch (error) {
        return "An error curred when changing 'sc_show_main_msg' value";
      }
    },
    SetDefaultServerConfig: async () => {
      ServerPropsModel.deleteMany({});
      new ServerPropsModel({
        key: "sc_show_banners",
        value: false,
      }).save();
      new ServerPropsModel({
        key: "sc_show_giveaway_info",
        value: false,
      }).save();
      new ServerPropsModel({
        key: "sc_show_main_msg",
        value: true,
      }).save();
      new ServerPropsModel({
        key: "sc_welcome_message",
        value: "Welcome to kitchit, here you can post any food you like.",
      }).save();
      return {
        sc_show_banners: false,
        sc_show_giveaway_info: false,
        sc_show_main_msg: true,
        sc_welcome_msg:
          "Welcome to kitchit, here you can post any food you like.",
      };
    },
  },
};

const ApolloResolvers = merge(
  GeneralResolvers,
  PostResolvers,
  ProfileResolvers,
  NotificationResolvers,
  UserResolvers
);

export default ApolloResolvers;
