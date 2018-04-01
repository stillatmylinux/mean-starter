module.exports = {
	// heroku config variables
	mongoURI: process.env.MONGO_URI,
	googleClientID: process.env.GOOGLE_CLIENT_ID,
	googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
	facebook_app_id: process.env.FACEBOOK_APP_ID,
	facebook_app_secret: process.env.FACEBOOK_APP_SECRET,
	facebook_callbackURL: process.env.FACEBOOK_CALLBACK_URL,
	stripe_secret_key: process.env.STRIPE_SECRET_KEY
}