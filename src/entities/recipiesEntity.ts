import { gql } from 'apollo-server-express'

const schema = gql`

  type Recipe @key(field: "id) {
    id: ID! @external
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

  type Query {
    getRecipes(filtering: RecipeInputFiltering, token: String!): [Recipe]!
    getOneRecipe(id: ID!, token:String!): Recipe
    getFavs: [Recipe]
  }
  
  type Mutation {
    createRecipe(input: RecipeInput, token: String!): Recipe
    updateRecipe(id: ID!, input: RecipeInput!, token: String!): Recipe
    deleteRecipe(id: ID!, token: String!): String
    addToFavs(id: ID!, token: String!): Recipe
    removeFromFavs(id: ID!, token: String!): String
  }

`

export default schema
