import Blog from '../../../models/Blog';
import {filterAndPagination} from '../../../utils/filterAndPagination';

export default {

	// Lists all blogs
	blogs: async (parent, args) => {
		let { data } = filterAndPagination({},args.limit,args.skip);
		return await Blog.find({}).populate('userId').where(data.where).limit(data.limit).skip(data.skip);
	},

};