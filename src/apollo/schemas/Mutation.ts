import gql from "graphql-tag";

export const Mutations = gql`
  extend type Mutation {
    CreateGlobalNotification: String
    # This mutation takes username, name, email and phone parameters and responds with a User
    CreateUser(content: NewUserInput): User
    UpdateFCM(content: String): String
    UpdateUserData(id: ID, content: NewUserDataInput): String
    SetDefaultServerConfig: DefaultServerConfig
    ShowMainMessage(show: Boolean): String
  }
`;
