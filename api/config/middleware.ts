import { expressMiddleware } from "@apollo/server/express4";
import { Express } from "express";
import { ApolloServer } from "@apollo/server";

function applyServerMiddleware(app: Express, server: ApolloServer) {
  const middleware = expressMiddleware(server, {
    context: async ({ req }) => ({ token: req.headers.token }),
  });
  app.use("/graphql", middleware);
}
export { applyServerMiddleware };
