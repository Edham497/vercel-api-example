import { merge } from "lodash";
import PostResolvers from "./Posts";
import ProfileResolvers from "./Profile";
import NotificationResolvers from "./Notifications";

const GeneralResolvers = {
  Query: {
    HelloMessage: () => "Hello World",
    ServerConfig: () => {
      return {
        sc_show_banners: false,
        sc_show_main_msg: false,
        sc_show_giveaway_info: true,
      };
    },
  },
};

const ApolloResolvers = merge(
  GeneralResolvers,
  PostResolvers,
  ProfileResolvers,
  NotificationResolvers
);

export default ApolloResolvers;
