import 'reflect-metadata';
import dotenv from 'dotenv';
import {ApolloServer} from 'apollo-server';
import jwt from 'jsonwebtoken';
import config from './config';
import typeDefs from './schemas';
import resolvers from './resolvers';
import connectDB from './db';

dotenv.config();

const startServer = async () => {
  await connectDB();

  const server = new ApolloServer({
    playground: true,
    introspection: true,
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
  server.listen({port: PORT}).then( ({url}:{url:string}) => {
    console.log(`server ready at: ${url}`);
    // console.log(`GraphQL endpoint locally at url: http://localhost:${PORT}${server.graphqlPath}`);
  }).catch( (error) => {
    console.log(error);
  });
};

startServer();
