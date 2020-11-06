import { gql } from 'apollo-server-express'
const schemas = gql`
  type Query {
    greetings: String
  }
  
  # User Schema
  
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

  type Mutation {
    signUp(input: UserInput): User
    login(input: LoginInput): Token
    createCategory(input: CategoryInput!): Category
  }

  # Category Schemas

  type Category {
    id: ID 
    name: String!
  }

  input CategoryInput { 
    name: String
  }

  # extend type Query {
    # getCategories(filtering: CategoryInput): [Category]!
    # getOneCategory(id: ID!, token:String!): Category
  # }

  # extend type Mutation {
    
    # updateCategory(id: ID!, input: CategoryInput!, token: String!): Category
    # deleteCategory(id: ID!, token: String!): String
  # }

  # Recipe Schema

  type Recipe  {
    id: ID! 
    name: String!
    description: String!
    ingredients: [String!]!
    category: Category
  }

  input RecipeInput {
    name: String
    ingredient: [String]
    description: String
    category: String
  }

  input RecipeInputFiltering {
    name: String
    ingredient: [String]
    category: String
  }

  # extend type Query {
    # getRecipes(filtering: RecipeInputFiltering, token: String!): [Recipe]!
    # getOneRecipe(id: ID!, token:String!): Recipe
    # getFavs: [Recipe]
  # }
  
  # extend type Mutation {
    # createRecipe(input: RecipeInput, token: String!): Recipe
    # updateRecipe(id: ID!, input: RecipeInput!, token: String!): Recipe
    # deleteRecipe(id: ID!, token: String!): String
    # addToFavs(id: ID!, token: String!): Recipe
    # removeFromFavs(id: ID!, token: String!): String
  # }
`
export default schemas;
