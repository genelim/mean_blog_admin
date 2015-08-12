var mongoose = require('mongoose');

var user = new mongoose.Schema({
	username: String,
	password: String,
	roles:[String]
});

var User = mongoose.model('User', user);

module.exports = User;