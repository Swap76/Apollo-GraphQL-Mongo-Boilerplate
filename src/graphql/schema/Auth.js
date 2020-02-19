import { gql } from 'apollo-server-express';

const typeDefs =  gql `

	type jwtToken {
		userId: ID
		token: String
		code: String!
		success: Boolean!
		message: String!
	}

	extend type Query {
		login(email:String!,password:String!): jwtToken!
		resendOtp(userId:ID!): QueryResponse!
		forgotPasswordMail(email:String!): QueryResponse!
	}

	extend type Mutation {
		logout(userId:ID!): MutationResponse!
		signup(name:String, username:String!,email:String!, password:String! ): MutationResponse!
		verifyUser(userId:ID!, otp:String!): MutationResponse!
		forgotPassword(newPassword:String!,newRePassword:String!,key:String!): MutationResponse!
	}

`;

export default typeDefs;