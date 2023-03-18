# Typescript Express server with Apollo GraphQL and MongoDB in Vercel

1.  Install dependences

```
yarn add apollo-server-core apollo-server-express cors dotenv express graphql lodash mongo

yarn add -D @babel/cli @babel/core @babel/node @babel/preset-env @babel/preset-typescript @babel/register @types/express @types/lodash babel-plugin-module-resolver consola nodemon typescript
```

2. configure **.babelrc**

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-typescript"],
  "plugins": [
    [
      "module-resolver",
      {
        "root": ["./api"],
        "extensions": [".js", ".ts", ".tsx", ".json"]
        // "alias": {
        //   "models": "./api/models",
        //   "apollo": "./api/apollo"
        // }
      }
    ]
  ]
}
```
