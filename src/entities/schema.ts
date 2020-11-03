import { gql } from 'apollo-server-express';

const schema = gql`
  type Query {
    greetings: String
  }
`

export default schema
