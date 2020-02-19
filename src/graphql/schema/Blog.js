import { gql } from 'apollo-server-express';

const typeDefs =  gql `

  type Blog {
    _id: ID!
    userId: User!
    title: String!
    content: String!
    upvote: [String]!
    downvote: [String]!
    tags: [String]!
    pinned: Boolean!
  }

  type singleBlog {
    blog: Blog!,
    comments: [Comment]!
  }

  input BlogWhereInput {
    pinned: Boolean
  }

  extend type Query {
    blogById(_id: ID!): singleBlog!
    blogByUser(userId:String!,where:BlogWhereInput,limit:Int,skip:Int): [Blog]!
  }

  extend type Mutation {
    createBlog(title: String!,content:String!,tags:String!): MutationResponse!
    editBlog(_id:ID!,title: String!,content: String!,tags:String!): MutationResponse!
    deleteBlog(_id:ID!): MutationResponse!
  }

`;

export default typeDefs;