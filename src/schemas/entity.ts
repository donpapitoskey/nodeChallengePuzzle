import { gql } from 'apollo-server-express'
const schema = gql`
  extend type Query {
    greetings: String
  }
`
export default schema