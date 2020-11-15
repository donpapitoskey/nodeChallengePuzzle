/* eslint-disable new-cap */
import {Recipe, Category, User} from '../entity';
import {getRepository} from 'typeorm';

interface RecipeFilterInput {
  name: string;
  ingredients: string[];
  category: number;
}

interface RecipeInput {
  name: string;
  description: string;
  ingredients: string;
  category: number;
}

const ingredientsSearchCriteria = (input:string[]):string => {
  let output = '{';
  input = input.map((element) => `"${element}"`);
  output = output.concat(input.toString(), '}');
  return output;
};

const validateRecipeInputs = (
    name:string,
    ingredients:string[],
    category:number,
):boolean[] => {
  const nameValid = name !== undefined && name !== null;
  const categoryValid = category !== undefined && category !== null;
  const ingredientsValid = ingredients !== undefined && ingredients !== null;
  return [nameValid, categoryValid, ingredientsValid];
};

const hasEmptyString = (input:string[]):boolean => (
  input.some((element)=> element === '')
);

const isValidInput = (input:any):boolean => (
  input !== undefined && input !== null
);


export default {
  Query: {
    getRecipes: async (_:any,
        {filtering}:{filtering:RecipeFilterInput},
        ctx:{user:User},
    ):Promise<Recipe[]> => {
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
      const RecipeRepository = getRepository(Recipe);
      if (filtering === undefined ) {
        const results = await RecipeRepository.find({relations: ['category']});
        return results;
      }
      const {name, category, ingredients} = filtering;
      const [
        nameValid,
        categoryValid,
        ingredientsValid,
      ] = validateRecipeInputs(name, ingredients, category);
      if (!categoryValid) {
        if (!ingredientsValid) {
          if (!nameValid) {
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
        if (!nameValid) {
          const results = await RecipeRepository
              .createQueryBuilder('recipe')
              .leftJoinAndSelect('recipe.category', 'category')
              .where('recipe.ingredients @> :ingredient',
                  {ingredient: searchIngredients},
              ).getMany();
          return results;
        }
        const results = await RecipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.category', 'category')
            .where('recipe.name ~~* :name', {name: `%${name}%`})
            .andWhere('recipe.ingredients @> :ingredient',
                {ingredient: searchIngredients},
            ).getMany();
        return results;
      }
      const CategoryRepository = getRepository(Category);
      const categoryExists = await CategoryRepository.findOne({id: category});
      if (!categoryExists) {
        throw new Error('This category does not exists');
      }
      const searchCategory = categoryExists.id;
      if (!ingredientsValid) {
        if (!nameValid) {
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
      if (!nameValid) {
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
    getOneRecipe: async (_:any, {id}:{id:number}, ctx:{user:User}) => {
      const {user} = ctx;
      if (isValidInput(user)) {
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
    getMyRecipes: async (_:any, __:any, ctx:{user:User}) => {
      const {user} = ctx;
      if (isValidInput(user)) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository
          .findOne({id: user.id}, {relations: ['favorites']});
      if (userExists === undefined) {
        throw new Error('The user does not exist');
      }
      return userExists.favorites;
    },
  },
  Mutation: {
    createRecipe: async (_:any,
        {input}:{input:RecipeInput},
        ctx:{user:User},
    ) => {
      const {user} = ctx;
      const {name, category, description, ingredients} = input;
      if (hasEmptyString([name, description, ingredients[0]])) {
        throw new
        Error('name, description, and ingredients are mandatory');
      }
      const RecipeRepository = getRepository(Recipe);
      const CategoryRepository = getRepository(Category);
      if (!isValidInput(user)) {
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
          .findOne({id: category});
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
      if (hasEmptyString([name, description, ingredients[0]])) {
        throw new
        Error('Name, description, and ingredients are mandatory');
      }
      if (!isValidInput(user)) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository.findOne({id: user.id});
      if (!userExists) {
        throw new Error('The user does not exist');
      }
      const CategoryRepository = getRepository(Category);
      const categoryExists = await CategoryRepository
          .findOne({id: category});
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
        recipeToUpdate.ingredients = ingredients;
      }
      if (description !== undefined) {
        recipeToUpdate.description= description;
      }
      recipeToUpdate.category = categoryExists;
      await RecipeRepository.save(recipeToUpdate);
      return 'Recipe Updated';
    },
    deleteRecipe: async (_:any, {id}:{id:number}, ctx:{user: User}) => {
      const {user} = ctx;
      if (!isValidInput(user)) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository
          .findOne({id: user.id}, {relations: ['favorites']});
      if (!userExists) {
        throw new Error('The user does not exist');
      }
      const RecipeRepository = getRepository(Recipe);
      await RecipeRepository.delete({id});
      return 'Recipe deleted!';
    },
    addToMyRecipes: async (_:any, {id}:{id:number}, ctx:{user: User}) => {
      const {user} = ctx;
      if (!isValidInput(user)) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository
          .findOne({id: user.id}, {relations: ['favorites']});
      if (!userExists) {
        throw new Error('The user does not exist');
      }
      const RecipeRepository = getRepository(Recipe);
      const recipeToFavs = await RecipeRepository.findOne({id});
      if (recipeToFavs === undefined) {
        throw new Error('Recipe not fount');
      }
      userExists.favorites.push(recipeToFavs);
      const result = await UserRepository.save(userExists);
      return result;
    },
    removeFromMyRecipes: async (_:any, {id}:{id:number}, ctx:{user:User}) => {
      const {user} = ctx;
      if (!isValidInput(user)) {
        throw new Error('Error with authentication. Please login again');
      }
      const UserRepository = getRepository(User);
      const userExists = await UserRepository
          .findOne({id: user.id}, {relations: ['favorites']});
      if (!userExists) {
        throw new Error('The user does not exist');
      }
      userExists.favorites = userExists.favorites
          .filter((element) => element.id != id);
      await UserRepository.save(userExists);
      return 'The recipe no longer belongs to your recipes';
    },
  },
};
