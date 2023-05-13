import gql from "graphql-tag";

export const Querys = gql`
  extend type Query {
    HelloMessage: String
    ServerConfig: ServerConfigResponse

    Posts: [Post]
    AnalyticsPostsByCategory: [PostCountByCategory]
    AnalyticsPostsByUser: [PostsCountByUser]
    User(id: ID): User
    Profile(id: ID): Profile
    PostsByProfile(id: ID, page: Int): [Post]
    Notifications: [Notification]
    RegisteredStats(year: Int): RegisteredStatsResponse
    RegisteredStatsBetweenDates(
      startDate: String
      endDate: String
    ): RegisteredStatsResponse
  }
`;
