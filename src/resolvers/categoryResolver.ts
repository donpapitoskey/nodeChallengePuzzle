import {Category, User} from '../entity';
import {getRepository} from 'typeorm';

export default {
  Query: {
    getCategories: async (_:any, __:any, ctx:{user:User}) => {
      const {user} = ctx;
      const CategoryRepository = getRepository(Category);
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
      const result = await CategoryRepository.find();
      return result;
    },
    getOneCategory: async (_:any, {id}:{id:string}, ctx:{user:User}) => {
      const {user} = ctx;
      const CategoryRepository = getRepository(Category);
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
      const result = await CategoryRepository.findOne(id);
      return result;
    },
  },
  Mutation: {
    createCategory: async (_:any,
        {input}:{input:Category},
        ctx:{user:User},
    ) => {
      const {name} = input;
      const CategoryRepository = getRepository(Category);
      if (ctx.user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: ctx.user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
      const categoryExists = await CategoryRepository.findOne({name});
      if (categoryExists) {
        throw new Error('This category exists already');
      }
      const result = await CategoryRepository.save(input);
      return result;
    },
    updateCategory: async (_:any,
        {id, input}:{id:string, input:Category},
        ctx:{user:User},
    ) => {
      const {user} = ctx;
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
    },
    deleteCategory: async (_:any, {id}:{id:string}, ctx:{user:User}) => {
      const {user} = ctx;
      const CategoryRepository = getRepository(Category);
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
      const {affected} = await CategoryRepository.delete(id);
      if (!affected) {
        throw new Error('The category does not exist');
      }
      return 'Deletion completed';
    },
  },
};
