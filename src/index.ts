import {ApolloServer} from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import config from './config';
import typeDefs from './entities';
import resolvers from './resolvers';

const app = express();

app.use(cors());

app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.applyMiddleware({app,path:'/graphql'});

const PORT = config.port || 3000;

app.listen(PORT,() => {
  app.use('/',(_,res) => {
    res.send({message: 'Hello buddy'});
  });
  console.log(`Graphql endpoint at http://localhost:${PORT}/graphql`)
});
