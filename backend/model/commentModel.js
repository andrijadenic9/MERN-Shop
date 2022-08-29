const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment_author: { type: String, required: Boolean },
    comment_content: { type: String, required: Boolean },
    comment_status: { type: Boolean, default: false },
    comment_date: { type: String },
    product_id: { type: String },
    product_title: { type: String }
})

const CommentModel = mongoose.model('comment', commentSchema);

module.exports = CommentModel;