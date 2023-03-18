import http from "http";
import { Express } from "express";
import {
  gql,
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageProductionDefault,
} from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { Server } from "http";
import ApolloResolvers from "../apollo/resolvers";
import { QueryTypes, Querys } from "../apollo/types";

type HttpApolloServer = Promise<[Server, ApolloServer]>;

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

async function configureApolloServer(app: Express): HttpApolloServer {
  const httpServer = http.createServer(app);
  const server = new ApolloServer({
    typeDefs: [typeDefs, Querys, QueryTypes],
    resolvers: ApolloResolvers,
    csrfPrevention: true,
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
  server.applyMiddleware({ app, path: "/graphql" });
  return [httpServer, server];
}

export default configureApolloServer;
