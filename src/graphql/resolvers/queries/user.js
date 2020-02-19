import User from '../../../models/User';
import {filterAndPagination} from '../../../utils/filterAndPagination';

export default {
	// Lists all users
	users: async (parent, args) => {
		let { data } = filterAndPagination(args.where,args.limit,args.skip);
		return await User.find({}).where(data.where).limit(data.limit).skip(data.skip); 
	},
  
	// Provides info for settings page
	userById: async (parent, args) => {
		let {_id} = args;
		return await User.findOne({_id}); 
	},
  
};