import Blog from '../../../models/Blog';
import checkInput from '../../../utils/joiValidate';
import responseFinal from '../../../utils/sendResponse';
import log from '../../../config/winston';
import formatter from '../../../utils/winstonFormatter';
import { checkOwnerOfBlogOrSuperUser } from '../../../utils/checksForBlogs';

export default {

	// Create blog
	createBlog : async (root, args, {req}) => {
		let { title, content, tags } = args;
		if (req.user == null) return responseFinal('403','You are not Authorized');
		let userId = req.user.id;
		try {
			let todayTimeStamp = +new Date; // Unix timestamp in milliseconds
			let oneDayTimeStamp = 1000 * 60 * 60 * 24; // Milliseconds in a day
			let diff = todayTimeStamp - oneDayTimeStamp;
			let blogs = await Blog.countDocuments({ userId, createdAt:{$gte: new Date(diff)} });
			if (blogs < 2) {
				const data = { userId, title, content, tags};
				const resultfromJoi = checkInput(['userId','title','content','tags'],data);
				if(resultfromJoi != true) return resultfromJoi;
				log.info(`user:${formatter(userId)},action:blog created`);
				data.tags = data.tags.split(',');
				let result = await new Blog(data).save();
				if (result) { 
					return responseFinal('200','New Blog Created Successfully'); 
				};
			} else {
				return responseFinal('422','There is a limit of 2 post per day. Try to post some time later.');
			}
		}
		catch(error) {
			return responseFinal('422',`${error.message}`);    
		};
	},

	// Edit blog
	editBlog : async (root, args, {req}) => {
		let { _id, title, content, tags} = args;
		if (req.user == null) return responseFinal('403','You are not Authorized');
		let userId = req.user.id;
		const data = { title, content, tags};
		let owner = await checkOwnerOfBlogOrSuperUser(userId,_id);
		if(owner != true ) return owner;
		const resultfromJoi = checkInput(['title','content','tags'],data);
		if(resultfromJoi != true) return resultfromJoi;
		log.info(`user:${formatter(userId)},blog:${_id},action:blog update`);
		data.tags = data.tags.split(',');
		try {
			let result = await Blog.findByIdAndUpdate(_id,{ $set: data});
			if (result) { 
				return responseFinal('200','Blog Edited Successfully');
			}
		} catch (error) {       
			return responseFinal('422',`${error.message}`);
		}
	},

	// Delete blog
	deleteBlog : async (root, args, {req}) => {
		let { _id } = args;
		if (req.user == null) return responseFinal('403','You are not Authorized');
		let userId = req.user.id;
		let owner = await checkOwnerOfBlogOrSuperUser(userId,_id);
		if(owner != true) return owner;
		try {
			let result = await Blog.findByIdAndRemove(_id);
			if (result) {
				return responseFinal('200','Blog Deleted Successfully');
			} else {
				return responseFinal('422','No such blog');
			}
		}
		catch (error) {       
			return responseFinal('422',`${error.message}`);
		}
	},
	
};