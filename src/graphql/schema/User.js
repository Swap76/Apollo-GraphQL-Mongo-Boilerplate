import { gql } from 'apollo-server-express';

const typeDefs =  gql `

  type User {
    _id: ID!
    name: String!
    email: String!
    username: String!
    about: String
    verified: Boolean!
    role: String
  }

  type notification {
    updates: Boolean!
    activities: Boolean!
  }

  enum notificationType {
    updates
    activities
  }

  enum Roles {
    superuser
    developer
  }

  input UserWhereInput {
    email: String
    username: String
    verified: Boolean
    role: Roles
  }

  type Query {
    users(where:UserWhereInput,limit:Int,skip:Int): [User]!
    userById(_id:ID!): User
    profilePage(_id:ID!):profile!
  }

  type profile {
    user: User!
    blogs: [Blog]
  }

  type Mutation {
    updateBio(about:String!):MutationResponse!
    updatePassword(oldPassword:String!,password:String!): MutationResponse!
  }
  
`;

export default typeDefs;