import { Express } from "express";
import {
  gql,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";

import ApolloResolvers from "../apollo/resolvers";
import { BaseTypes, QueryTypes, Querys } from "../apollo/types";

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
  # type Mutation
`;

export async function configureApolloServer(app: Express, httpServer: any) {
  const server = new ApolloServer({
    typeDefs: [typeDefs, BaseTypes, Querys, QueryTypes],
    resolvers: ApolloResolvers,
    csrfPrevention: true,
    introspection: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageProductionDefault({
        footer: false,
        version: "a5abcc0fe6febc4e1114b0e50e095695c72fab4b",
      }),
    ],
  });
  await server.start();
  server.applyMiddleware({ app });
}
