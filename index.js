import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import path from 'path';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';
import models from './models';


const typesArray = fileLoader(path.join(__dirname, './schema'));
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));

const typeDefs = mergeTypes(typesArray, { all: true });
const resolvers = mergeResolvers(resolversArray);

const server = new ApolloServer({ typeDefs, resolvers, context: { models, user: { id: 1 } } });

const app = express();
server.applyMiddleware({ app });

models.sequelize.sync({ }).then(() => {
  // eslint-disable-next-line no-console
  app.listen({ port: 8080 }, () => console.log(`🚀 Server ready at http://localhost:8080${server.graphqlPath}`));
});
