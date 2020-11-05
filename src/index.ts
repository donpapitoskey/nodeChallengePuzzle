import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import config from './config';
import typeDefs from './schemas';
import resolvers from './resolvers';
import connectDB from './db';


connectDB();

const app = express();

app.use(cors());

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({app,path:'/graphql'});

const PORT = config.port || 3000;

app.listen(PORT, () => {
  console.log(`GraphQL endpoint at url: http://localhost:${PORT}${server.graphqlPath}`);
})

