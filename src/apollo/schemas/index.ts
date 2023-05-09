import gql from "graphql-tag";
import { Mutations } from "./Mutation";
import { Querys } from "./Query";
import { QueryTypes, BaseTypes, InputTypes, MutationTypes } from "./types";

const typeDefs = gql`
  type Query
  type Mutation

  enum CacheControlScope {
    PUBLIC
    PRIVATE
  }

  directive @cacheControl(
    maxAge: Int
    scope: CacheControlScope
    inheritMaxAge: Boolean
  ) on FIELD_DEFINITION | OBJECT | INTERFACE | UNION
`;

export default [
  typeDefs,
  Querys,
  Mutations,
  BaseTypes,
  QueryTypes,
  MutationTypes,
  InputTypes,
];
