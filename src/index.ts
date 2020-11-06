import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import config from './config';
import typeDefs from './schemas';
import resolvers from './resolvers';
import {User, Category, Recipe} from './entity';
import connectDB from './db';

const startServer = async () => {

  const connection = await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers['authorization'] || '';
      if (token) {
        try {
          const user = jwt.verify(token, config.jwtSecret);
          return {user};
        } catch (error) {
          console.log('There was an error');
        }
      }
    }
  });

  const app = express();

  app.use(cors());

  app.use(express.json());

  server.applyMiddleware({ app, path: '/graphql' });

  const PORT = config.port || 3000;

  app.listen(PORT, () => {
    console.log(`GraphQL endpoint at url: http://localhost:${PORT}${server.graphqlPath}`);
  })
};

startServer();