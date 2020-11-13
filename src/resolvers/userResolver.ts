import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';
import {User} from '../entity';
import {getRepository} from 'typeorm';

interface Token {
  user: User;
  secret: string;
  expiresIn: string;
};

const createToken = ({user, secret, expiresIn}:Token):string => {
  const {id, email, name, password} = user;
  const token = jwt.sign({id, email, name, password}, secret, {expiresIn});
  return token;
};

export default {
  Mutation: {
    signUp: async (_:any, {input}:{input:User}) => {
      const {email, password, name} = input;
      if (email === '' || password === '' || name === '') {
        throw new Error('The email, password and name are required fields');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository.findOne({email});
      if (userExists) {
        throw new Error('The User is already registered.');
      }

      const salt = await bcryptjs.genSalt(11);
      input.password = await bcryptjs.hash(password, salt);

      try {
        UserRepository.save(input);
        return input;
      } catch (error) {
        console.log(error);
      }
    },
    login: async (_:any, {input}:{input:User}) => {
      const {email, password} = input;
      if (email === '' || password === '') {
        throw new Error('Email and password are required fields');
      }
      const UserRepository = getRepository(User);
      const userExists:User | undefined = await UserRepository.findOne({email});
      if (!userExists) {
        throw new Error('This user does not exists');
      }
      const passwortCheck = await bcryptjs
          .compare(password, userExists.password);
      if (!passwortCheck) {
        throw new Error('The password is incorrect');
      }

      const token = createToken({
        user: userExists,
        secret: config.jwtSecret,
        expiresIn: '12h',
      });
      return {token};
    },
  },
};
