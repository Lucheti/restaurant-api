import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import config from 'config';
import {buildSchema} from "type-graphql";
import {RestaurantResolver} from "./resolver/restaurant/RestaurantResolver";
import {context} from "./context";
import {CountryResolver} from "./resolver/country/CountryResolver";


const main = async () => {
  const app = express();

  const server = new ApolloServer({
    schema: await buildSchema({
      resolvers: [RestaurantResolver, CountryResolver],
    }),
    context,
    playground: true,
  });

  await server.start();

  server.applyMiddleware({ app });

  app.listen({ port: config.get('server.port') }, () => console.info(
    `🚀 Server ready and listening at ==> http://localhost:${config.get('server.port')}${
      server.graphqlPath
    }`,
  ));
};

main()
  .catch((error) => {
  console.error('Server failed to start', error);
});
