import Joi from '@hapi/joi';

let checkInput = (checks, data) => {
	let check = { };
	let checkList = {
		userId: Joi.string().required(),
		postId: Joi.string().required(),
		title: Joi.string().required().min(4).max(256),
		content: Joi.string().required().min(8).max(65536),
		tags: Joi.string().required().min(2).max(256),
		email: Joi.string().email().required().trim(),
		oldPassword: Joi.string().required().min(4).max(256),
		newPassword: Joi.string().required().min(8).max(32),
		newRePassword: Joi.string().required().min(8).max(32),
		password: Joi.string().required().min(4).max(256),
		name: Joi.string().required().min(4).max(32).trim(),
		username: Joi.string().required().min(4).max(32).trim(),
		about: Joi.string().required().min(4).max(32).trim(),
		otp: Joi.string().required().min(6).max(6).trim(),
		anyEmail: Joi.string().required().email().min(8).max(64).trim(),
		message: Joi.string().required().min(8).max(512).trim(),
		commentContent: Joi.string().required().min(4).max(2048),
	};
	checks.map((value) => {
		check[`${value}`] = checkList[`${value}`];
	});

	const { error } = Joi.validate(data, check);

	if (error) {
		return({'code':'422','success':false,'message': error.details[0].message});
	} else {
		return(true);
	}
};

export default checkInput;