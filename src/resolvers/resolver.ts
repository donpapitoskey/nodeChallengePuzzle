import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import {Category, Recipe, User}  from '../entity';
import {getRepository} from 'typeorm';

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
    greetings: () => ('Hello'),
    getCategories: async (_:any,__:any, ctx:{user:User}) => {
      
      const CategoryRepository = getRepository(Category);
      if (ctx.user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const result = await CategoryRepository.find();
      return result;
    }
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
        UserRepository.save(input);
        return input;
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
    }, createCategory: async (_:any,{input}:{input:Category}, ctx:{user:User}) => {
      const {name} = input;
      const CategoryRepository = getRepository(Category);
      if (ctx.user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);

      const userExists = await UserRepository.findOne({id: ctx.user.id});
      if (userExists === undefined) {
        throw new Error('User not registered. Please sign up.');
      }

      const categoryExists = await CategoryRepository.findOne({name});
      if (categoryExists) {
        throw new Error('This category exists already');
      } 
      const result = await CategoryRepository.save(input);
      return result;
    }
  }
}

export default resolvers
