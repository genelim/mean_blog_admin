var mongoose = require('mongoose');

var post = mongoose.Schema({
	title: String,
	date: { type: Date, default: Date.now },
	border_color: String,
	article: String
});

var Post = mongoose.model('Post', post);

module.exports = Post;