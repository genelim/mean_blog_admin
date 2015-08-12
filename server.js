var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	mongoose = require('mongoose'),
	User = require('./modals/user'),
	Post = require('./modals/post'),
	passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

mongoose.connect('mongodb://localhost/mean_blog');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(passport.initialize());

app.post('/post', function(request, response){
	var post = new Post(request.body);
	post.save(function (err, post) {
		if(err){
			throw err;
		}
		response.json(post);
	});
});

app.get('/post', function(request,response){
	Post.find(function(err, post){
		response.json(post);
	});
});

app.delete('/post/:id', function(request, response){
	Post.findOneAndRemove({_id:request.params.id},function(err,post){
		response.json(post);
	});
});

app.get('/postSingle/:id', function(request, response){
	Post.findOne({_id:request.params.id},function(err,post){
		response.json(post);
	});
});

app.put('/postSingle/:id',function(request,response){
	Post.findByIdAndUpdate(request.params.id, { title: request.body.title , border_color: request.body.border_color , article: request.body.article }, function(err, post) {
		response.json(post);
	});
});

passport.use(new LocalStrategy(
	function(username,password,done){
		User.findOne({username:username,password:password}, 
			function(err, user){
				if(user){
					return done(null, user);
				}
				return done(null, false, {message: 'Unable to Login!'});
			}
		);
	})
);

passport.serializeUser(function(user,done){
	done(null,user);
});
passport.deserializeUser(function(user,done){
	done(null,user);
});
app.post('/login', passport.authenticate('local'), function(request,response){
	console.log(request.user);
	response.json(request.user);
});



app.listen('3001');