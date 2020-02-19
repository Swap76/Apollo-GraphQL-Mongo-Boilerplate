import nodemailer from 'nodemailer';

export const sendEmail = (subject, email, message) => {
	return new Promise((resolve, reject) => {
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.MAIL_USERNAME,
				pass: process.env.MAIL_PASSWORD,
			},
		});
		const mailOptions = {
			from: process.env.MAIL_USERNAME,
			to: email,
			subject,
			html: `<p>${message}</p>`,
		};
		transporter.sendMail(mailOptions, (err) => {
			if (err) {
				reject(err);
			} else {
				resolve(true);
			}
		});
	});
};

export const composeMail = (message,name) => {
	message = message.replace(/(?:\r\n|\r|\n)/g, '<br>');
	message = 'Hey '+name+'<br><br>' + message;
	message += '<br><br>Regards,<br>SIESGSTarena Platform Team';
	return message;
};