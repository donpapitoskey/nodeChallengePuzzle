import { gql } from 'apollo-server-express'

const userSchema = gql`
  
  type User @key(fields: "id") {
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
  }

`

export default userSchema
