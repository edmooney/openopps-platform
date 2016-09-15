'use strict';

var express = require('express');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var hbs = require('hbs');
var bodyParser = require("body-parser");
var cfenv = require("cfenv");
var app = express();

var appEnv = cfenv.getAppEnv();
//deploy to cloud.gov or cloud foundry
var server = app.listen(appEnv.port);
//deploy locally
//var server = app.listen(8080);

pasport.use(new Strategy(
	function(username, password, cb){
		db.users.findByUsername(username, function(error, user){
			if (error){ return cb(error); }
			if (!user){ return cb(null, false); }
			if (user.password != password){ return cb(null, false); }
		});	return cb(null, user);	
	}));

passport.serializeUser(function(user,cb){
	cb(null, user.id);
});

passport.deserializeUser(function(id,cb) {
	db.users.findById(id, function(error, user){
		if (error) { return cb(error); }
		cb(null, user);
	});
});


app.set('view engine', 'html');
app.engine("html", hbs.__express);
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));

// Initialize Passport and restore authentication state.
app.use(passport.initialize());
app.use(passport.session());

app.get('/login', function(request, response){
	res.render('login');
});

app.post("/login",
	passport.authenticate('local', {failureRedirect: '/login'}),
	function(request, response){
		res.redirect("/some-api-endpoint");
	});

app.get('/some-api-endpoint', 
	require("connect-ensure-login").ensureLoggedIn(),
	function(request, response){
		responses.render('we', {user: request.user});
	});

