import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import {Category, Recipe, User}  from '../entity';
import {getConnection, getRepository} from 'typeorm';
import { exit } from 'process';

interface Token {
  user: User;
  secret: string;
  expiresIn: string;
};

const createToken = ({user, secret, expiresIn}:Token):string => {
  const {id,email,name,password} = user;
  const token = jwt.sign({id,email,name,password},secret,{expiresIn});
  return token;
};




const resolvers = {
  Query: {
    greetings: () => ('Hello')
  },
  Mutation: {
    signUp: async (_:any,{input}:{input:User}) => {
      const {email, password} = input;
      const UserRepository = getRepository(User);
      const userExists = await UserRepository.findOne({email});
      if(userExists) {
        throw new Error('The User is already registered.');
      }

      const salt = await bcryptjs.genSalt(11);
      input.password = await bcryptjs.hash(password,salt);

      try {
        let user = new User();
        user = input;
        UserRepository.save(user);
        return user;
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_:any,{input}:{input:User}) => {

      const {email, password} = input;
      const UserRepository = getRepository(User);
      const userExists:User | undefined = await UserRepository.findOne({email});
      if (!userExists) {
        throw new Error('This user already exists');
      }
      const passwortCheck = await bcryptjs.compare(password,userExists.password);
      if (!passwortCheck) {
        throw new Error('The password is incorrect');
      }

      const token = createToken({
        user: userExists,
        secret: config.jwtSecret,
        expiresIn: '12h'
      });
      return {token};
    }
  }
}

export default resolvers
