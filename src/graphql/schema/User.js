import { gql } from 'apollo-server-express';

const typeDefs =  gql `

  type User {
    _id: ID!
    name: String!
    email: String!
    username: String!
    about: String
    ratings: Int
    followers: [String]
    following: [String]
    topics: [String]
    notifications: notification!
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

  extend type Query {
    users(where:UserWhereInput,limit:Int,skip:Int): [User]!
    userById(_id:ID!): User
    profilePage(_id:ID!):profile!
  }

  type profile {
    user: User!
    blogs: [Blog]
  }

  extend type Mutation {
    updatePassword(oldPassword:String!,password:String!): MutationResponse!
  }
  
`;

export default typeDefs;