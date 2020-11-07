import {gql} from 'apollo-server-express';
const schemas = gql`
  
  # User Types
  
  type User {
    id: ID
    name: String
    email: String
    password: String
  }
 
  type Token {
    token: String
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  
  # Category Types

  type Category {
    id: ID 
    name: String!
    recipes: [Recipe]
  }

  input CategoryInput { 
    name: String
  }

  # Recipe Types

  type Recipe  {
    id: ID! 
    name: String
    description: String
    ingredients: [Ingredient!]
    category: Category
  }

  type Ingredient {
    name: String
    qty: Float
    unit: Unit
  }

  enum Unit {
    g
    ml
    teaspoon
    tablespoon
    unit
  }

  input IngredientInput {
    name: String!
    qty: Float!
    unit: Unit!
  }

  input RecipeInput {
    name: String!
    ingredients: [IngredientInput!]
    description: String!
    category: CategoryInput!
  }

  input RecipeInputFiltering {
    name: String
    ingredient: String
    category: String
  }

  type Query {
    greetings: String
    getCategories: [Category]!
    getOneCategory(id: ID!): Category
    getRecipes(filtering: RecipeInputFiltering): [Recipe]
    getOneRecipe(id: ID!): Recipe
    # getFavs: [Recipe]
  }

  type Mutation {
    signUp(input: UserInput): User
    login(input: LoginInput): Token
    createCategory(input: CategoryInput!): Category
    updateCategory(id: ID!, input: CategoryInput!): Category
    deleteCategory(id: ID!): String
    createRecipe(input: RecipeInput!): Recipe
    # updateRecipe(id: ID!, input: RecipeInput!, token: String!): Recipe
    # deleteRecipe(id: ID!, token: String!): String
    # addToFavs(id: ID!, token: String!): Recipe
    # removeFromFavs(id: ID!, token: String!): String
  }
  
`;
export default schemas;
