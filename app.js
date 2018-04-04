var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var flash = require('connect-flash');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
var appRoutes = require('./routes/app');
var userRoutes = require('./routes/user');
const googleauthRoutes = require('./routes/google-auth');

var app = express();

app.use(flash());

// Load User Model
require('./models/user');


// Passport Config
require('./config/passport-google')(passport);
require('./config/passport-local')(passport);

// Load Keys
const keys = require('./config/keys');

if(keys.mongoURI) {
	// Map global promises
	mongoose.Promise = global.Promise;
	// Mongoose Connect
	mongoose.connect(keys.mongoURI, {
	  useMongoClient:true
	})
		.then(() => console.log('MongoDB Connected'))
		.catch(err => console.log(err));
} else {
	console.log('Error: `keys.mongoURI` is not set in your config/keys_dev.js');
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});

app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Set global vars
app.use((req, res, next) => {
	res.locals.user = req.user || null;
	next();
});

app.use('/user', userRoutes);
app.use('/google',googleauthRoutes);
app.use('/', appRoutes);

console.log("\nopen http://localhost:8100"); // port set in bin/www

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	return res.render('index');
});


module.exports = app;
