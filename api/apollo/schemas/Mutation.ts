import { gql } from "apollo-server-core";

export const Mutations = gql`
  extend type Mutation {
    CreateGlobalNotification: String
  }
`;
