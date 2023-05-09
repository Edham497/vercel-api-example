import gql from "graphql-tag";

export const Querys = gql`
  extend type Query {
    HelloMessage: String
    ServerConfig: ServerConfigResponse

    Posts: [Post]
    User(id: ID): User
    Profile(id: ID): Profile
    PostsByProfile(id: ID, page: Int): [Post]
    Notifications: [Notification]
  }
`;
