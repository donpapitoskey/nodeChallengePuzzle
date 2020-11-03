import { gql } from 'apollo-server-express'

const schema = gql`
  
  type Category @key(field: "id) {
    id: ID! @external
    name: String!
  }

  input CategoryInput { 
    name: String
  }

  type Query {
    getCategories(filtering: CategoryInput, token: String!): [Category]!
    getOneCategory(id: ID!, token:String!): Category
  }

  type Mutation {
    createCategory(input: CategoryInput, token: String!): Category
    updateCategory(id: ID!, input: CategoryInput!, token: String!): Category
    deleteCategory(id: ID!, token: String!): String
  }
`

export default schema
