import 'reflect-metadata';
import { createConnection } from 'typeorm';
import entities from '../entity';

const connectDB = async () => {
  try {
    console.log("awaiting DB connection");
    const connection = await createConnection();
    console.log('database Connected');
  } catch (error) {
    console.log('There was an error');
    console.log(error);
    process.exit();
  }
};

export default connectDB;
