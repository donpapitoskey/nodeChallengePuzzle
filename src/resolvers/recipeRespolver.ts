/* eslint-disable new-cap */
import {Recipe, Category, User} from '../entity';
import {getRepository} from 'typeorm';

interface RecipeFilterInput {
  name: string;
  ingredients: string[];
  category: string;
}

interface RecipeInput {
  name: string;
  description: string;
  ingredients: string[];
  category: string;
}

const ingredientsSearchCriteria = (input:string[]):string => {
  let output = '{';
  input = input.map((element) => `"${element}"`);
  output = output.concat(input.toString(), '}');
  return output;
};

export default {
  Query: {
    getRecipes: async (_:any,
        {filtering}:{filtering:RecipeFilterInput},
        ctx:{user:User},
    ):Promise<Recipe[]> => {
      const {name, ingredients, category} = filtering;
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
      const CategoryRepository = getRepository(Category);
      const categoryExists = await CategoryRepository.findOne({name: category});
      if (!categoryExists) {
        throw new Error('This category does not exists');
      }
      const searchCategory = categoryExists.id;
      const searchIngredients = ingredientsSearchCriteria(ingredients);
      const results = await RecipeRepository
          .createQueryBuilder('recipe')
          .leftJoinAndSelect('recipe.category', 'category')
          // .from(Recipe, 'recipe')
          .where('recipe.name ~~* :name', {name: `%${name}%`})
          .andWhere('recipe.category = :category', {category: searchCategory})
          .andWhere('recipe.ingredients @> :ingredient',
              {ingredient: searchIngredients},
          )
          /* .where('recipe.name ~~* :name AND recipe.categoryId = :category',
              {name: '%tomato%', category: 1})*/
          /* .where('recipe.ingredients = :category', {category: 1})
          .loadAllRelationIds()*/
          /* .where('recipe.ingredients @> :ingredient',
              {ingredient: '{"Tomato"}'})*/
          .getMany();
      // find({relations: ['category'], where: {name: Like('%soup%')}});
      // console.log(results);
      // results = results.map((element) => element.category = categoryExists);
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
