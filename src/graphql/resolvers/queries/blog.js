import Blog from '../../../models/Blog';
import Comments from '../../../models/Comment';
import log from '../../../config/winston';
import formatter from '../../../utils/winstonFormatter';
import {filterAndPagination} from '../../../utils/filterAndPagination';

export default {
	// Single blog can be found out
	blogById: async (parent, args) => {
		let {userId, _id } = args;
		log.info(`user:${formatter(userId)},blog:${_id},action:show blog`);
		let blog = await Blog.findOne({_id}).populate('userId');
		let comments = await Comments.find({ postId:_id }).populate('userId').sort({ createdAt: 1 }).populate('userId').limit(15);
		if (blog && comments) {
			return ({
				blog,
				comments
			});
		}
	},

	// All blogs by user
	blogByUser: async (parent, args) => {
		let { userId } = args;
		log.info(`user:${formatter(userId)},action:blog user`);
		let { data } = filterAndPagination({},args.limit,args.skip);
		return await Blog.find({userId}).limit(data.limit).skip(data.skip).sort({'updatedAt': -1});
	},
  
};