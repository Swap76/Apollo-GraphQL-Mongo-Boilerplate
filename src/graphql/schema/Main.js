import { gql } from 'apollo-server-express';

const typeDefs =  gql `

	extend type Query {
		blogs(limit:Int,skip:Int): [Blog]!
	}

`;

export default typeDefs;