import { gql } from "apollo-server-core";
import { Mutations } from "./Mutation";
import { Querys } from "./Query";
import { QueryTypes, BaseTypes } from "./types";

const typeDefs = gql`
  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION

  type Query
  type Mutation
`;

export default [typeDefs, Querys, Mutations, BaseTypes, QueryTypes];
