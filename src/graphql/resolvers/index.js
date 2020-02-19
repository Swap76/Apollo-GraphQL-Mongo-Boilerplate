import authQuery from './queries/auth';
import blogQuery from './queries/blog';
import userQuery from './queries/user';
import commentQuery from './queries/comment';
import mainQuery from './queries/main';
import authMutations from './mutations/auth';
import blogMutations from './mutations/blog';
import userMutations from './mutations/user';
import commentMutations from './mutations/comment';

export default {
	Query: {
		...authQuery,
		...blogQuery,
		...userQuery,
		...commentQuery,
		...mainQuery,
	},

	Mutation: {
		...authMutations,
		...blogMutations,
		...userMutations,
		...commentMutations,
	},
  
	MutationResponse: {
		__resolveType(mutationResponse, context, info){
			return null;
		},
	},
  
};