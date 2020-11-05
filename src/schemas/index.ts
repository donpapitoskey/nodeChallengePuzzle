import { gql } from 'apollo-server'
import schema from './entity'
import categorySchema from './categorySchema'
import userSchema from './userSchema'
import recipeSchema from './recipiesSchema'

const typeDefs = gql`
  type Query {
    _: String
  }
  
  type Mutation {
    _:String
  }
`

export default [
  typeDefs,
  schema,
  //categorySchema,
  userSchema,
  //recipySchema
]
