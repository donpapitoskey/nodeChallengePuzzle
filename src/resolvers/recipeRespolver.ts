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
  ingredients: string;
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
      const RecipeRepository = getRepository(Recipe);
      if (filtering === undefined ) {
        const results = await RecipeRepository.find({relations: ['category']});
        return results;
      }
      const {name, ingredients, category} = filtering;

      if (category === undefined) {
        if (ingredients === undefined) {
          if (name === undefined) {
            const results = new Recipe();
            return [results];
          }
          const results = await RecipeRepository
              .createQueryBuilder('recipe')
              .leftJoinAndSelect('recipe.category', 'category')
              .where('recipe.name ~~* :name', {name: `%${name}%`})
              .getMany();
          return results;
        }
        const searchIngredients = ingredientsSearchCriteria(ingredients);
        if (name === undefined) {
          const results = await RecipeRepository
              .createQueryBuilder('recipe')
              .leftJoinAndSelect('recipe.category', 'category')
              .where('recipe.ingredients @> :ingredient',
                  {ingredient: searchIngredients},
              ).orWhere('recipe.ingredients @> :ingredient',
                  {ingredient: searchIngredients},
              )
              .getMany();
          return results;
        }
        const results = await RecipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.category', 'category')
            .where('recipe.name ~~* :name', {name: `%${name}%`})
            .andWhere('recipe.ingredients @> :ingredient',
                {ingredient: searchIngredients},
            ).orWhere('recipe.ingredients @> :ingredient',
                {ingredient: searchIngredients},
            )
            .getMany();
        return results;
      }
      const CategoryRepository = getRepository(Category);
      const categoryExists = await CategoryRepository.findOne({name: category});
      if (!categoryExists) {
        throw new Error('This category does not exists');
      }
      const searchCategory = categoryExists.id;
      if (ingredients === undefined) {
        if (name === undefined) {
          const results = await RecipeRepository
              .createQueryBuilder('recipe')
              .leftJoinAndSelect('recipe.category', 'category')
              .where('recipe.category = :category', {category: searchCategory})
              .getMany();
          return results;
        }
        const results = await RecipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.category', 'category')
            .where('recipe.name ~~* :name', {name: `%${name}%`})
            .andWhere('recipe.category = :category', {category: searchCategory})
            .getMany();

        return results;
      }
      const searchIngredients = ingredientsSearchCriteria(ingredients);
      if (name === undefined) {
        const results = await RecipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.category', 'category')
            .where('recipe.category = :category', {category: searchCategory})
            .andWhere('recipe.ingredients @> :ingredient',
                {ingredient: searchIngredients},
            ).getMany();
        return results;
      }
      const results = await RecipeRepository
          .createQueryBuilder('recipe')
          .leftJoinAndSelect('recipe.category', 'category')
          .where('recipe.name ~~* :name', {name: `%${name}%`})
          .andWhere('recipe.category = :category', {category: searchCategory})
          .andWhere('recipe.ingredients @> :ingredient',
              {ingredient: searchIngredients},
          )
          .getMany();
      return results;
    },
    getOneRecipe: async (_:any, {id}:{id:string}, ctx:{user:User}) => {
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
      const RecipeRepository = getRepository(Recipe);
      const result = await RecipeRepository.findOne(id);
      return result;
    },
    getMyRecipes: async () => {

    }
  },
  Mutation: {
    createRecipe: async (_:any,
        {input}:{input:RecipeInput},
        ctx:{user:User},
    ) => {
      const {user} = ctx;
      const {name, category, description, ingredients} = input;
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
          .findOne({name: category});

      if (!categoryExists) {
        throw new Error('Invalid Category');
      }
      const storeData = new Recipe();
      storeData.name = name,
      storeData.description = description;
      storeData.ingredients = ingredients;
      storeData.category = categoryExists;
      const result = await RecipeRepository.save(storeData);
      return result;
    },
    updateRecipe: async (_:any,
      {id, input}:{id:number, input:RecipeInput},
      ctx:{user:User},
    ) => {
      const {user} = ctx;
      const {category, description, ingredients, name} = input;
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository.findOne({id: user.id});
      if (!userExists) {
        throw new Error('The user does not exist');
      }
      const CategoryRepository = getRepository(Category);
      const categoryExists = await CategoryRepository
          .findOne({name: category});
      if (categoryExists === undefined) {
        throw new Error('Invalid Category');
      }
      const RecipeRepository = getRepository(Recipe);
      const recipeToUpdate = await RecipeRepository.findOne({id});
      if (recipeToUpdate === undefined) {
        throw new Error('The Recipe no longer exists');
      }
      if (name !== undefined) {
        recipeToUpdate.name = name;
      }
      if (ingredients !== undefined) {
        recipeToUpdate.ingredients = ingredients
      } 
      if (description === undefined) {
        recipeToUpdate.description= description;
      }
      recipeToUpdate.category = categoryExists;
      const results = await RecipeRepository.save(recipeToUpdate);
      return 'Recipe deleted';
    },
    deleteRecipe: async (_:any, {id}:{id:number}, ctx:{user: User}) => {
      const {user} = ctx;
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository.findOne({id: user.id},{relations: ['favorites']});
      if (!userExists) {
        throw new Error('The user does not exist');
      }
      const RecipeRepository = getRepository(Recipe);
      const results = await RecipeRepository.delete({id});
      return results;
    },
    addToMyRecipes: async (_:any, {id}:{id:number}, ctx:{user: User}) => {
      const {user} = ctx;
      if (user === undefined) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository.findOne({id: user.id},{relations: ['favorites']});
      if (!userExists) {
        throw new Error('The user does not exist');
      }
      const RecipeRepository = getRepository(Recipe);
      const recipeToFavs = await RecipeRepository.findOne({id});
      console.log(recipeToFavs);
      
      if (recipeToFavs === undefined) {
        throw new Error('Recipe not fount');
      }
      userExists.favorites.push(recipeToFavs);
      console.log(userExists);
      const result = await UserRepository.save(userExists);
      return result;
    },
    removeFromMyRecipes: async () => {

    },
  },
};
