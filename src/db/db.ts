import {createConnection} from 'typeorm';

const connectDB = async () => {
  try {
    console.log('awaiting DB connection');
    await createConnection();
    console.log('database Connected');
  } catch (error) {
    console.log('There was an error');
    console.log(error);
    process.exit();
  }
};

export default connectDB;
