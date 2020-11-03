import 'reflect-metadata';
import { createConnection } from 'typeorm';
import entities from '../entity';

const connectDB = async () => {
  try {
    await createConnection({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "admin",
      database: "postgres",
      entities,
      synchronize: true,
      logging: false
    });
    console.log('database Connected');
  } catch (error) {
    console.log('There was an error');
    console.log(error);
    process.exit();
  }
};

export default connectDB;
