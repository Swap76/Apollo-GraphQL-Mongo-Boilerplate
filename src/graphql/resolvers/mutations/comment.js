import Comments from '../../../models/Comment';
import checkInput from '../../../utils/joiValidate';
import log from '../../../config/winston';
import formatter from '../../../utils/winstonFormatter';
import { checkOwnerOrSuperUserOfComment } from '../../../utils/checksForComments';
import responseFinal from '../../../utils/sendResponse';

export default {
	// Write comment
	writeComment : async (root, args, {req}) => {
		const { postId, content } = args;
		if (req.user == null) return responseFinal('403','You are not Authorized');
		let userId = req.user.id;
		try {
			const data = {userId, postId, commentContent:content};
			const resultfromJoi = checkInput(['userId','postId','commentContent'],data);
			if(resultfromJoi != true) return resultfromJoi;
			let result = await new Comments({userId,postId,content}).save();
			if (result) { 
				log.info(`user:${formatter(userId)},blog:${postId},action:new comment`);
				return responseFinal('200','Comment Added Successfully'); 
			};
		} catch (error) {
			return responseFinal('422',`${error.message}`);
		}
	},

	// Edit comment
	editComment: async (root, args, {req}) => {
		const { _id, content} = args;
		if (req.user == null) return responseFinal('403','You are not Authorized');
		let userId = req.user.id;
		try {
			const data = {userId, commentContent:content};
			const resultfromJoi = checkInput(['userId','commentContent'],data);
			const ownerOrNot =  await checkOwnerOrSuperUserOfComment(userId,_id);
			if(resultfromJoi != true) return resultfromJoi ;
			else if (ownerOrNot != true) return ownerOrNot;
			let result = await Comments.findByIdAndUpdate(_id,{ $set: {userId,content}});
			if (result) { 
				log.info(`user:${formatter(userId)},comment:${_id},action:update comment`);
				return responseFinal('200','Comment Edited Successfully'); 
			};
		} catch (error) {
			return responseFinal('422',`${error.message}`);
		}
	},

	// Delete comment
	deleteComment: async (root, args, {req}) => {
		const { _id } = args;
		if (req.user == null) return responseFinal('403','You are not Authorized');
		let userId = req.user.id;
		try {
			const ownerOrNot =  await checkOwnerOrSuperUserOfComment(userId,_id);
			if ( ownerOrNot != true ) return ownerOrNot;
			let result = await Comments.findByIdAndRemove(_id);
			if (result) { 
				log.info(`user:${formatter(userId)},blog:${result.postId},comment:${_id},action:delete comment`);
				return responseFinal('200','Comment Deleted Successfully'); 
			};
		} catch (error) {
			return responseFinal('422',`${error.message}`);
		}
	},

};