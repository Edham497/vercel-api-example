import gql from "graphql-tag";

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
export const Mutations = gql`
  extend type Mutation {
    CreateGlobalNotification: String
  }
`;

export const QueryTypes = gql`
  type ServerConfigResponse {
    sc_show_banners: Boolean
    sc_show_main_msg: Boolean
    sc_show_giveaway_info: Boolean
  }

  type AppNotificationBody {
    title: String
    message: String
    image: String
  }

  type RegisteredStatsResponse {
    name: String
    data: [Int]
    total: Int
  }
  type PostsCountByUser {
    _id: ID
    count: Int
    username: String
  }
  type PostCountByCategory {
    category: String
    count: Int
  }
`;

export const MutationTypes = gql`
  type DefaultServerConfig {
    sc_show_banners: Boolean
    sc_show_main_msg: Boolean
    sc_show_giveaway_info: Boolean
    sc_welcome_msg: String
  }
`;

export const BaseTypes = gql`
  type Author {
    _id: ID
    username: String
    picture: String
  }

  type Profile {
    _id: ID
    username: String
    picture: String
    fcmid: String
    provider: String
    email: String
  }

  type User {
    _id: ID
    username: String
    name: String
    email: String
    phone: String
    picture: String
    fcmid: String
    fcmt: String
    provider: String
    description: String
    wallet: ID
  }

  type Post {
    _id: ID
    files: [String]
    cover: String
    title: String
    description: String
    recipe: ID
    category: String
    author: Author
  }

  type Notification {
    _id: ID
    isAppNotification: Boolean
    appNotificationId: String
    appNotificationBody: AppNotificationBody
    read: Boolean
    type: String
    post: ID
    sender: ID
    receiver: ID
  }
`;

export const InputTypes = gql`
  input NewUserInput {
    username: String!
    name: String!
    email: String!
    phoneNumber: String!
  }

  input NewUserDataInput {
    username: String
    name: String
    description: String
    picture: String
  }
`;
