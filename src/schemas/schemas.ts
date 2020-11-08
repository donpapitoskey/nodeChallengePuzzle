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
    ingredients: [String!]
    category: Category
  }

  input RecipeInput {
    name: String!
    ingredients: [String!]
    description: String!
    category: String!
  }

  input RecipeInputFiltering {
    name: String
    ingredients: [String]
    category: String
  }

  type Query {
    greetings: String
    getCategories: [Category]!
    getOneCategory(id: ID!): Category
    getRecipes(filtering: RecipeInputFiltering): [Recipe]
    getOneRecipe(id: ID!): Recipe
    getMyRecipes: [Recipe]
  }

  type Mutation {
    signUp(input: UserInput): User
    login(input: LoginInput): Token
    createCategory(input: CategoryInput!): Category
    updateCategory(id: ID!, input: CategoryInput!): Category
    deleteCategory(id: ID!): String
    createRecipe(input: RecipeInput!): Recipe
    updateRecipe(id: ID!, input: RecipeInput!): Recipe
    deleteRecipe(id: ID!): String
    addToMyRecipes(id: ID!): Recipe
    removeFromMyRecipes(id: ID!): String
  }
  
`;
export default schemas;
