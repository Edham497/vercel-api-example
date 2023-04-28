import { gql } from "apollo-server-core";

export const Querys = gql`
  extend type Query {
    HelloMessage: String
    ServerConfig: ServerConfigResponse

    Posts: [Post]
    Profile(id: ID): Profile
    PostsByProfile(id: ID, page: Int): [Post]
    Notifications: [Notification]
  }
`;
