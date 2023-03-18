import { merge } from "lodash";

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

const ApolloResolvers = merge(GeneralResolvers);
export default ApolloResolvers;
