import Comments from '../../../models/Comment';
import {filterAndPagination} from '../../../utils/filterAndPagination';

export default {
	// All commments
	comments: async (parent, args) => {
		let { data } = filterAndPagination(args.where,args.limit,args.skip);
		return await Comments.find({}).populate('userId').where(data.where).limit(data.limit).skip(data.skip); 
	},
  
	// Single Comment by Id
	commentById: async (parent, args) => {
		let { _id } = args;
		return await Comments.findOne({_id}).populate('userId'); 
	},
};