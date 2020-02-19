import mongoose from 'mongoose';

const resetPasswordSchema = mongoose.Schema;

const resetPassword = new resetPasswordSchema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
	},
	resetKey: {
		type: String,
		required: true,
		unique: true,
	},
	status: {
		type: Boolean,
		required: true,
		default: true,
	},
}, {
	timestamps: true,
});

export default mongoose.model('ResetPassword', resetPassword);