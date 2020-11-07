import {Recipe, Category, User} from '../entity';
import {getRepository} from 'typeorm';

interface RecipeFiltering {
  name: string;
  ingredients: string[];
  category: string;
}

export default {
  Query: {
    getRecipes: async (_:any,
        {filtering}:{filtering:Recipe},
        ctx:{user:User}
    ):Promise<Recipe[]> => {
      const {name,ingredients, category} = filtering;
      const {user} = ctx;
      const RecipeRepository = getRepository(Recipe);
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      try {
        await UserRepository.findOne({id: user.id});
      } catch (error) {
        throw new Error('The user does not exist');
      }
      const results = await RecipeRepository.find({relations: ['category']});
      console.log(results);
      console.log(name);
      return results;
    },
    getOneRecipe: async (_:any, {id}:{id:string}, ctx:{user:User}) => {
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
    createRecipe: async (_:any, {input}:{input:Recipe}, ctx:{user:User}) => {
      const {user} = ctx;
      const {name, category} = input;
      const RecipeRepository = getRepository(Recipe);
      const CategoryRepository = getRepository(Category);
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }

      const UserRepository = getRepository(User);
      const userExists = await UserRepository.findOne({id: user.id});
      if (!userExists) {
        throw new Error('The user does not exist');
      }

      const recipeExists = await RecipeRepository.findOne({name});
      if (recipeExists) {
        throw new Error('This Recipe exists already');
      }
      const categoryExists = await CategoryRepository
          .findOne({name: category.name});

      if (!categoryExists) {
        throw new Error('Invalid Category');
      }
      input.category = categoryExists;
      console.log(input);
      const result = await RecipeRepository.save(input);
      return result;
    },
  },
};
