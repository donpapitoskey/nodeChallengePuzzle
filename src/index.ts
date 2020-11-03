import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import cors from 'cors';
import config from './config';
import typeDefs from './schemas';
import resolvers from './resolvers';
import connectDB from './db';

const app = express();


connectDB();
