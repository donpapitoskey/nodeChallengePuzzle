import {Category, User} from '../entity';
import {getRepository} from 'typeorm';

const isValidInput = (input:any):boolean => (
  input !== undefined && input !== null
);

export default {
  Query: {
    getCategories: async (_:any, __:any, ctx:{user:User}) => {
      const {user} = ctx;
      const CategoryRepository = getRepository(Category);
      if (!isValidInput(user)) {
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
    getOneCategory: async (_:any, {id}:{id:number}, ctx:{user:User}) => {
      const {user} = ctx;
      const CategoryRepository = getRepository(Category);
      if (!isValidInput(user)) {
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
      if (name === '') {
        throw new Error('The name is mandatory');
      }
      const CategoryRepository = getRepository(Category);
      if (!isValidInput(ctx.user)) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: ctx.user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
      const categoryExists = await CategoryRepository.findOne({name});
      if (categoryExists !== undefined) {
        throw new Error('This category exists already');
      }
      const result = await CategoryRepository.save(input);
      return result;
    },
    updateCategory: async (_:any,
        {id, input}:{id:number, input:Category},
        ctx:{user:User},
    ) => {
      const {name} = input;
      if (name === '') {
        throw new Error('The name is mandatory');
      }
      const {user} = ctx;
      if (!isValidInput(user)) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
      const CategoryRepository = getRepository(Category);
      const categoryToUpdate = await CategoryRepository.findOne({id});
      if (categoryToUpdate === undefined) {
        throw new Error('That category no longer exists');
      }
      categoryToUpdate.name = input.name;
      const result = await CategoryRepository.save(categoryToUpdate);
      return result;
    },
    deleteCategory: async (_:any, {id}:{id:string}, ctx:{user:User}) => {
      const {user} = ctx;
      const CategoryRepository = getRepository(Category);
      if (!isValidInput(user)) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
      const {affected} = await CategoryRepository.delete(id);
      if (affected === null || affected == undefined) {
        throw new Error('The category does not exist');
      }
      return 'Deletion completed';
    },
  },
};
