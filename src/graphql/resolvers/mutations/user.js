import User from '../../../models/User';
import bcrypt from 'bcrypt';
import checkInput from '../../../utils/joiValidate';
import responseFinal from '../../../utils/sendResponse';

export default {
	// Update bio
	updateBio: async (parent, args, context) => {
		let {about } = args;
		let result;
		const data = {about};
		const resultFromJoi = checkInput(['about'],data);
		if (resultFromJoi != true) return resultFromJoi;
		try {
			let _id = context.data.userId;
			if (!context.data.isAuth) return responseFinal('403','You are not Authorized');
			result = await User.findOneAndUpdate({_id},{$set:data});
		} catch (error) {       
			return responseFinal('422',`${error.message}`);
		}
		if (result) {
			return responseFinal('200','Info Updated Successfully');
		}
	},

	// Update password
	updatePassword: async (parent, args, context) => {
		let { oldPassword, password } = args;
		const data = { oldPassword, password };
		const resultFromJoi = checkInput(['oldPassword','password'],data);
		if (resultFromJoi != true) return resultFromJoi;
		try {
			let _id = context.data.userId;
			if (!context.data.isAuth) return responseFinal('403','You are not Authorized');
			let user = await User.findById(_id);
			if (user && oldPassword && password) {
				let match = await bcrypt.compare(oldPassword, user.password);
				if (match) {
					let hash = await bcrypt.hash(password, 10);
					if (hash) {
						let result = await User.findOneAndUpdate({ _id}, { password: hash });
						if (result) { 
							return responseFinal('200','Password changed Successfully');
						}
					}
				} else {
					return responseFinal('422','Incorrect Old Password');
				}
			}
		} catch (error) {
			return responseFinal('422',`${error.message}`);
		}
	},

};