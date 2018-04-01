var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

// Load user model
const User = mongoose.model('User');

module.exports = (passport) => {
	passport.use(new LocalStrategy({
			// by default, local strategy uses username and password, we will override with email
			usernameField : 'email',
			passwordField : 'password',
			passReqToCallback : true // allows us to pass back the entire request to the callback
	},
	(req, email, password, done) => {

		User.findOne({ email: email }, (err, user) => {

			if (err) { 
				return done(err);
			}

			if (!user) {
				return done('error', false, { message: 'Incorrect email.' });
			}
	
			if (!bcrypt.compareSync(password, user.password)) {

				console.log('Incorrect password');

				return done(null, false, { message: 'Incorrect password.' });
			}

			return done(null, user);
		});
			
	}));
}