import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const userSchema = mongoose.Schema;

const user = new userSchema({
	email: {
		type: String,
		required: true,
		unique: true,
		text: true,
	},
	name: {
		type: String,
		required: true,
		minlength: 4,
		text: true,
	},
	username: {
		type: String,
		required: true,
		minlength: 4,
		unique: true,
		text: true,
	},
	password: {
		type: String,
		required: true,
	},
	about: {
		type: String,
		default: null,
		text: true,
	},
	ratings: {
		type: Number,
		default: 0,
		required: true,
	},
	followers: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
	}],
	following: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		unique: true,
	}],
	social: {
		facebook: {
			type: String,
		},
		twitter: {
			type: String,
		},
		github: {
			type: String,
		},
	},
	notifications: {
		updates: {
			type: Boolean,
			required: true,
			default: true,
		},
		activities: {
			type: Boolean,
			required: true,
			default: true,
		},
	},
	otp: {
		type: String,
		required: true,
		maxlength: 6,
		minlength: 6,
	},
	verified: {
		type: Boolean,
		default: false,
	},
	role: {
		type: String,
		enum: ['superuser','developer',null],
		default: null,
	},
	topics: [{
		type: String,
	}],
}, {
	timestamps: true,
});

user.plugin(mongoosePaginate);

export default mongoose.model('User', user);