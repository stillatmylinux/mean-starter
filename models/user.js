var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var mongooseUniqueValidator = require('mongoose-unique-validator')
var schema = new Schema({
	googleID:{type:String},
	firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	password: {type: String, required: true},
	email: {type: String, required: true, unique: true},
	image: {type: String},
	tokens: {type: Number}
});

schema.plugin(mongooseUniqueValidator);

module.exports = mongoose.model('User', schema);