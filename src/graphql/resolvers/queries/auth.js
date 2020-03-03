import User from '../../../models/User';
import setTokens from '../../../utils/set-jwt-tokens';
import ResetPassword from '../../../models/ResetPassword';
import checkInput from '../../../utils/joiValidate';
import {checkForLogin, checkForExistinguserWithId, checkForExistinguserWithMail} from '../../../utils/checkForAuth';
import { sendEmail } from '../../../utils/mail';
import responseFinal from '../../../utils/sendResponse';
import log from '../../../config/winston';
import formatter from '../../../utils/winstonFormatter';

export default {
	// Login
	login: async (parent, args, {res}) => {
		let { email, password } = args;
		const resultfromJoi = checkInput(['email','password'],args);
		if(resultfromJoi != true) return resultfromJoi;
		const checked = await checkForLogin(email,password);
		if (!checked.success) return checked;
		log.info(`user:${formatter(checked.userId)},action:login`);
		const tokens = setTokens(checked.userId);
		const cookies = tokenCookies(tokens);
		res.cookie(...cookies.access);
		res.cookie(...cookies.refresh);
		return { userId: checked.userId, ...tokens, ...responseFinal('200','Sucessfully Logged In')};
	},

	// Resend Otp
	resendOtp: async (parent, args) => {
		let {  userId  } = args;
		const resultfromJoi = checkInput(['userId'],args);
		if(resultfromJoi != true) return resultfromJoi;
		let existingUser = await checkForExistinguserWithId(userId);
		if (existingUser == false) return responseFinal('404','No Such User Exists');;
		try {
			let user = await User.findById({_id:userId});
			if (user.verified == true) return responseFinal('404','You are Already verified.');
			const message = `Account Confirmation OTP: ${user.otp}`;
			let result = await sendEmail('Website Name - Account Confirmation',user.email,message);
			if (!result) return responseFinal('404','Error sending mail');
			return responseFinal('200','OTP resent successfully');
		} catch (error) {
			return responseFinal('404','Some Error try again.');
		}
	},

	// Sends forgot password mail with reset key
	forgotPasswordMail: async (parent, args) => {
		let {  email  } = args;
		const resultfromJoi = checkInput(['email'],args);
		if(resultfromJoi != true) return resultfromJoi;
		let existingUser = await checkForExistinguserWithMail(email.toLowerCase());
		if (existingUser != true) return existingUser;
		try {
			let user = await User.findOne({email});
			let resetKey = Math.random().toString(36).substring(2);
			let data = {userId:user._id,resetKey};
			let result = await new ResetPassword(data).save();
			if (!result) return responseFinal('404','Some error try again');
			const message = `Account Password Reset Link: Your Website URL/${resetKey}`;
			let mail = await sendEmail('Website Name - Password Reset',user.email,message);
			if (!mail) return responseFinal('404','Error sending mail');
			return responseFinal('200','Check your email to reset your password');
		} catch (error) {
			return responseFinal('404','Some Error try again.');
		}
	},
  
};

function tokenCookies({ accessToken, refreshToken }) {
	const cookieOptions = {
	  httpOnly: true
	  // secure: true, //for HTTPS only
	  // domain: "your-website.com",
	  // SameSite: None
	};
	return {
	  access: ['access', accessToken, cookieOptions],
	  refresh: ['refresh', refreshToken, cookieOptions]
	};
}