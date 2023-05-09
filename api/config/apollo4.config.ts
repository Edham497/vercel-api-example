import { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import resolvers from "../apollo/resolvers";
import typeDefs from "../apollo/schemas";

interface MyContext {
  token?: String;
}

export async function configureApolloServer(httpServer: any) {
  const server = new ApolloServer<MyContext>({
    resolvers,
    typeDefs,
    csrfPrevention: true,
    introspection: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  return server;
}
