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

app.set('view engine', 'html');
app.engine("html", hbs.__express);
app.use(bodyParser.urlencoded({extended: true}));
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/static'));





