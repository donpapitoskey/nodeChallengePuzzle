import 'reflect-metadata';
import dotenv from 'dotenv';
import {ApolloServer} from 'apollo-server';
//import {ApolloServer} from 'apollo-server-express';
import expressPlayground from 'graphql-playground-middleware-express';
import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import config from './config';
import typeDefs from './schemas';
import resolvers from './resolvers';
import connectDB from './db';

dotenv.config();

const startServer = async () => {
  console.log('passed here');
  await connectDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
      const token = req.headers['authorization'] || '';
      if (token) {
        try {
          const user = jwt.verify(token, config.jwtSecret);
          return {user};
        } catch (error) {
          console.log('There was an error');
        }
      }
    },
  });

  // const app = express();

  // app.use(cors());

  // app.use(express.json());

  // server.applyMiddleware({app, path: '/graphql'});

  // app.get('/playground', expressPlayground({endpoint: '/grapqhl'}));

  const PORT = process.env.PORT || 3000;

  // app.listen(PORT, () => {
  server.listen(PORT).then( ({url}:{url:string}) => {
    console.log(`server ready at: ${url}`);
    // console.log(`GraphQL endpoint locally at url: http://localhost:${PORT}${server.graphqlPath}`);
  });
};

startServer();
