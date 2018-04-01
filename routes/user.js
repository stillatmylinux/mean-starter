var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const passport = require('passport');

var User = require('../models/user');


router.post('/', function (req, res, next) {
    var user = new User({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: bcrypt.hashSync(req.body.password, 10),
		email: req.body.email
	});
	user.save(function(err, result) {
		if(err) {
			return res.status(500).json({
				title: 'An error occurred',
				error: err
			});
		}
		res.status(201).json({
			message: 'User created',
			obj: result
		});
	});
});

router.post('/signin', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if(err || !user) {
			return res.status(401).json({
				message: 'Logged failed'
			});
		}

		console.log(user);

		// Sample user
		// {
		// 	_id: 5a249d68e9300c001485ae4d,
		// 	firstName: 'Willy',
		// 	lastName: 'Wonka',
		// 	password: '$2a$10$h9KBMmSL@asdfaeVlZzuxsUS.p.UFBC5yoDasdfDYmWn1R27KL.',
		// 	email: 'matt@stillatmylinux.com',
		// 	__v: 0
		// }

		var token = jwt.sign({user: user}, 'secret', {expiresIn: 7200});
		return res.status(200).json({
			message: 'Successfully logged in',
			userId: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			password: user.password,
			email: user.email,
			image: user.image,
			token: token
		});
	})(req, res, next);
});

router.get('/logout', (req, res) => {
	req.logout();
	res.status(200).json({
		message: 'Successfully logged out'
	});
});

module.exports = router;
