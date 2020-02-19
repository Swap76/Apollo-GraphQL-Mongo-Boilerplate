import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';

const commentSchema = mongoose.Schema;

const comment = new commentSchema ({
	postId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Blog',
		required: true,
	},
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	content: {
		type: String,
		required: true,
		text: true,
		maxlength: 2048,
	},
}, {
	timestamps: true,
});

comment.plugin(mongoosePaginate);

export default mongoose.model('Comment', comment);