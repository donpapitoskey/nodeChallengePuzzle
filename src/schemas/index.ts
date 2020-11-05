import { gql } from 'apollo-server'
import schema from './entity'
import categoryEntity from './categorySchema'
import userEntity from './userSchema'
import recipyEntity from './recipiesSchema'

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
  //categoryEntity,
  //userEntity,
  //recipyEntity
]
