import User from '../../../models/User';
import bcrypt from 'bcrypt';
import { sendEmail } from '../../../utils/mail';
import generateOTP from '../../../utils/generateOpt';
import { checkForSignUp, checkForExistinguserWithId } from '../../../utils/checkForAuth';
import checkInput from '../../../utils/joiValidate';
import log from '../../../config/winston';
import formatter from '../../../utils/winstonFormatter';
import responseFinal from '../../../utils/sendResponse';
import ResetPassword from '../../../models/ResetPassword';

export default {
	// Logout
	logout: async (parent, args, context) => {
		let {  isAuth , token } = context.data;
		console.log(context);
		if (!isAuth) return responseFinal('403','You are not Logged In');
		try {
			log.info(`user:${formatter(args.userId)},action:logout`);
			return responseFinal('200','You are logged out.');
		} catch (error) {
			return responseFinal('404','Some Error try again.');
		}
	},

	// Signup
	signup: async (parent, args) => {
		let { username, email, password } = args;
		const resultfromJoi = checkInput(['name','username','email', 'password'],args);
		if(resultfromJoi != true) return resultfromJoi;
		if(username.includes(' ')) return responseFinal('404','No White Spaces allowed in username');
		let existingUser = await checkForSignUp(email.toLowerCase(),username);
		if (existingUser != false) return existingUser;
		try {
			let otp = generateOTP();
			let hash = await bcrypt.hash(password,10);
			let user = await new User({...args,password:hash,otp, email:email.toLowerCase()}).save();
			const message = `Visit Your Website URL/${user._id}\n` + `Account Confirmation OTP: ${otp}`;
			let result = await sendEmail('Your Website - Account Confirmation',email,message);
			if (!result) responseFinal('404','Error sending mail');
			return responseFinal('200','New Account Created Successfully');
		} catch (error) {
			return responseFinal('404','Some Error try again.');
		}
	},

	// Verify user using OTP
	verifyUser: async (parent, args) => {
		let {  userId , otp } = args;
		const resultfromJoi = checkInput(['otp'],{otp});
		if(resultfromJoi != true) return resultfromJoi;
		try {
			let existingUser = await checkForExistinguserWithId(userId);
			if (existingUser == false) return responseFinal('404','No Such User Exists');
			let user = await User.findById({_id:userId});
			if (user.verified == true) return responseFinal('404','You are Already verified.');
			let result = await User.findByIdAndUpdate(userId,{ $set: {verified:true}});
			if (result) return responseFinal('200','You are successfully verified.');
		} catch (error) {
			return responseFinal('404','Some Error try again.');
		}
	},

	// Resets account with new password using key
	forgotPassword: async (parent, args) => {
		let {  newPassword , newRePassword, key } = args;
		const resultfromJoi = checkInput(['newPassword','newRePassword'],{newPassword,newRePassword});
		if(resultfromJoi != true) return resultfromJoi;
		try {
			if (newPassword != newRePassword) return responseFinal('404','Passwords did not match!');
			let user = await ResetPassword.findOne({resetKey:key, status:true});
			if (!user) return responseFinal('403','Reset link expired');
			let hash = await bcrypt.hash(newPassword,10);
			let resetPassword = await User.findByIdAndUpdate({_id:user.userId},{ $set: {password:hash}});
			let expireKey = await ResetPassword.findOneAndUpdate({resetKey:key}, {status:false});
			if( resetPassword && expireKey) return responseFinal('200','Password changed successfully. You can login now.');
		} catch (error) {
			return responseFinal('404','Some Error try again.');
		}
	},
};