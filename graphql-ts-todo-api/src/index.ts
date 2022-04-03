import "reflect-metadata"
import express, { Express } from "express";
// graphql
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
//
import { TaskResolver } from "./resolvers/task";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
// pg
import { createConnection } from "typeorm";


const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "todolist-graphql-db",
    entities :[],
    logging: true,
    synchronize: true,
    username:"postgres",
    password:"postgres",
    port: 5432
  }) 


  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [TaskResolver],
      validate: false,
    }),
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
  });

  await apolloServer.start();
  const app: Express = express();
  // use apollo
  apolloServer.applyMiddleware({ app });

  app.get("/", (_req, res) => res.send("hello world"));
  const PORT = process.env.PORT || 8964;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

main().catch((err) => console.error(err));
