import { gql } from "apollo-server-core";

export const Querys = gql`
  extend type Query {
    HelloMessage: String
    ServerConfig: ServerConfigResponse
  }
`;

export const QueryTypes = gql`
  type ServerConfigResponse {
    sc_show_banners: Boolean
    sc_show_main_msg: Boolean
    sc_show_giveaway_info: Boolean
  }
`;
