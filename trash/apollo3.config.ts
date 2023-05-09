// import { Express } from "express";
// import { ApolloServer } from "apollo-server-express";
// import {
//   ApolloServerPluginDrainHttpServer,
//   ApolloServerPluginLandingPageProductionDefault,
// } from "apollo-server-core";

// import resolvers from "../apollo/resolvers";
// import typeDefs from "../apollo/schemas";

// export async function configureApolloServer(app: Express, httpServer: any) {
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     csrfPrevention: true,
//     introspection: true,
//     cache: "bounded",
//     plugins: [
//       ApolloServerPluginDrainHttpServer({ httpServer }),
//       ApolloServerPluginLandingPageProductionDefault({
//         footer: false,
//         version: "a5abcc0fe6febc4e1114b0e50e095695c72fab4b",
//       }),
//     ],
//   });
//   await server.start();
//   server.applyMiddleware({ app });
// }
