import Blog from '../models/Blog';
import User from '../models/User';
import responseFinal from './sendResponse';

export const checkOwnerOfBlogOrSuperUser = async (userId,blogId) => {
	let blog = await Blog.findById({_id:blogId});
	let user = await User.findById({_id:userId});
	if(userId == blog.userId.toString() || user.role == 'superuser') return true;
	else return responseFinal('403', 'You are not owner of this post');
};

export const upvoteBlogOrNot = async (userId,postId) => {
	let blog = await Blog.findById(postId);
	if (blog && blog.userId.toString() === userId.toString()) {
		return responseFinal('403','You cannot upvote your own post');
	} else if (blog.upvote.length > 0 && blog.upvote.indexOf(userId.toString()) > -1) {
		return responseFinal('422','You have already upvoted for this post');
	}  else return true;
};

export const downvoteBlogOrNot = async (userId,postId) => {
	let blog = await Blog.findById(postId);
	if (blog && blog.userId.toString() === userId.toString()) {
		return ({'code':'403','success':false,'message': 'You cannot downvote your own post'});
	} else if (blog.downvote.length > 0 && blog.downvote.indexOf(userId.toString()) > -1) {
		return ({'code':'422','success':false,'message': 'You have already downvoted for this post'});
	}  else return true;
};