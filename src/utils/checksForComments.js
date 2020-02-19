import Comments from '../models/Comment';
import responseFinal from './sendResponse';

export const checkOwnerOrSuperUserOfComment = async (userId,commentId) => {
	let comment = await Comments.findOne({_id:commentId});
	if (comment.userId == userId) return true;
	else return responseFinal('422', 'You are not owner of this comment');
};

export const upvoteCommentOrNot = async (userId,_id) => {
	let comment = await Comments.findById(_id);
	if (comment && comment.userId.toString() === userId.toString()) {
		return responseFinal('422','You cannot upvote your own comment');
	} else if (comment.upvote.length > 0 && comment.upvote.indexOf(userId.toString()) > -1) {
		return responseFinal('422','You have already upvoted for this comment');
	} else return true;
};

export const downvoteCommentOrNot = async (userId,_id) => {
	let comment = await Comments.findById(_id);
	if (comment && comment.userId.toString() === userId.toString()) {
		return responseFinal('422','You cannot downvote your own comment');
	} else if (comment.downvote.length > 0 && comment.downvote.indexOf(userId.toString()) > -1) {
		return responseFinal('422','You have already downvoted for this comment');
	} else return true;
};