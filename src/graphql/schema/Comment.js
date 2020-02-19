import { gql } from 'apollo-server-express';

const typeDefs =  gql `

  type Comment {    
    _id: ID!
    postId: String!
    userId: User!
    content: String!
  }

  input CommentWhereInput {
    postId: String
    userId: String
  }

  extend type Query {
    comments(where:CommentWhereInput,limit:Int,skip:Int): [Comment]!
    commentById(_id: ID!): Comment
  }

  extend type Mutation {
    writeComment(postId: String!,content: String!): MutationResponse!
    editComment(_id: ID!,content: String!): MutationResponse!
    deleteComment(_id: ID!): MutationResponse!
  }

`;

export default typeDefs;