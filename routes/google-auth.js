const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

router.get('/signin', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get('/auth/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
		
			console.log(req.user);

			// {
			// 	_id: 59f5615f9bdce3200d1bc628,
			// 	firstName: 'Matt',
			// 	lastName: 'Thiessen',
			// 	password: '$2a$10$9JC9O91n4DB5M.QKcsbeUeNq.cDMuR.rMUfyLu8vAHibfM/jaEIwm',
			// 	email: 'matt@thiessen.us',
			// 	__v: 0
			// }

			var token = jwt.sign({user: req.user}, 'secret', {expiresIn: 7200});
			res.render('auth', {
				message: 'Successfully logged in',
				userId: req.user._id,
				token: token
			});
});

router.get('/verify', (req, res) => {
	if (req.user) {
		console.log(req.user);
	} else {
		console.log('Not Auth');
	}
});

module.exports = router;