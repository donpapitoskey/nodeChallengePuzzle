import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import {Category, Recipe, User}  from '../entity';
import {getConnection, getRepository} from 'typeorm';

interface Token {
  user: User;
  secret: string;
  expiresIn: string;
};

const createToken = ({user, secret, expiresIn}:Token):string => {
  console.log(`This is the infor of the token \n ${user}`);
  return 'Return token';
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
    }
  }
}

export default resolvers
