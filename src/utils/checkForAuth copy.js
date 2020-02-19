import User from '../models/User';
import bcrypt from 'bcrypt';
import responseFinal from './sendResponse';

export const checkForLogin = async (email,password) => {
	let user = await User.findOne({email});
	if (!user) return responseFinal('403', 'Incorrect email address');
	if (!user.verified) return responseFinal('403', 'Your Email is not Verified');
	let isMatch = await bcrypt.compare(password, user.password);
	if (!isMatch) return responseFinal('403', 'Incorrect Password');
	return {userId:user._id, success:true};
};

export const checkForSignUp = async (email,username) => {
	try {
		let user = await User.findOne({email});
		let usernamecheck = await User.findOne({username});
		if (user._id) return responseFinal('403', 'User with that email address already exists');
		else if (usernamecheck._id) return responseFinal('403', 'User with that username already exists');
	} catch (error) {
		return false;
	}
};

export const checkForExistinguserWithMail = async (email) => {
	try {
		let user = await User.findOne({email});
		if (user._id) return true;
	} catch (error) {
		return responseFinal('403', 'No such user exists');
	}
};

export const checkForExistinguserWithId = async (userId) => {
	try {
		let user = await User.findById({_id:userId});
		if (user._id) return true;
	} catch (error) {
		return false;
	}
};