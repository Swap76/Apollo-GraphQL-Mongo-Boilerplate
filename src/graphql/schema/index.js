import { gql } from 'apollo-server-express';

const typeDefs =  gql `

  type MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type QueryResponse {
    code: String!
    success: Boolean!
    message: String!
  }

`;

export default typeDefs;