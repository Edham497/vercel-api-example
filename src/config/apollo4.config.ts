import { Express } from "express";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import resolvers from "../apollo/resolvers";
import typeDefs from "../apollo/schemas";
import { expressMiddleware } from "@apollo/server/express4";

interface MyContext {
  token?: String;
}

export async function configureApolloServer(app: Express, httpServer: any) {
  const server = new ApolloServer<MyContext>({
    resolvers,
    typeDefs,
    csrfPrevention: true,
    introspection: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req }) => ({}),
    })
  );
}
