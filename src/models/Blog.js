import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate';

const blogSchema = mongoose.Schema;

const blog = new blogSchema ({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
	title: {
		type: String,
		required: true,
		text: true,
		maxlength: 256,
	},
	content: {
		type: String,
		required: true,
		text: true,
		maxlength: 65536,
	},
	tags: [{
		type: String,
		text: true,
	}],
}, {
	timestamps: true,
});

blog.plugin(mongoosePaginate);
blog.plugin(mongooseAggregatePaginate);

export default mongoose.model('Blog', blog);;