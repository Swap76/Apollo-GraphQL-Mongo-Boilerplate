import authQuery from './queries/auth';
import blogQuery from './queries/blog';
import userQuery from './queries/user';
import commentQuery from './queries/comment';
import contestQuery from './queries/contest';
import ratingsQuery from './queries/ratings';
import problemQuery from './queries/problem';
import submissionQuery from './queries/submission';
import feedbackQuery from './queries/feedback';
import mainQuery from './queries/main';
import appQuery from './queries/app';
import authMutations from './mutations/auth';
import blogMutations from './mutations/blog';
import userMutations from './mutations/user';
import commentMutations from './mutations/comment';
import contestMutations from './mutations/contest';
import ratingsMutations from './mutations/ratings';
import submissionMutations from './mutations/submission';
import feedbackMutations from './mutations/feedback';

export default {
	Query: {
		...authQuery,
		...blogQuery,
		...userQuery,
		...commentQuery,
		...contestQuery,
		...ratingsQuery,
		...problemQuery,
		...submissionQuery,
		...feedbackQuery,
		...mainQuery,
		...appQuery
	},

	Mutation: {
		...authMutations,
		...blogMutations,
		...userMutations,
		...commentMutations,
		...contestMutations,
		...ratingsMutations,
		...submissionMutations,
		...feedbackMutations
	},
  
	MutationResponse: {
		__resolveType(mutationResponse, context, info){
			return null;
		},
	},
  
};