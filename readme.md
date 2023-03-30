# Typescript Express server with Apollo GraphQL and MongoDB in Vercel

1.  Install dependences

```
yarn add apollo-server-core apollo-server-express cors dotenv express graphql lodash mongo
```

```
yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript @babel/register @types/express @types/lodash babel-plugin-module-resolver consola nodemon typescript
```

2. configurar **.babelrc**

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./api"],
        "extensions": [".js", ".ts", ".tsx", ".json"]
      }
    ]
  ]
}
```

3. configurar la entrada de la api serverless en **api/index.ts**

```ts
// api/index.ts

// se obtiene la instancia y el servidor
const [app, httpServer] = configureExpress();

// se configura apollo con lo que nos devolvio la configuracion de express
configureApolloServer(app, httpServer);

// exportamos el httpServer para que Vercel lo pueda reconocer
export default httpServer;
```

4. configurar **vercel.json**

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/api" }]
}
```
