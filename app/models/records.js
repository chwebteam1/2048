var mongoose = require('mongoose');

module.exports = mongoose.model('records', {
	"username" : String,
	"score": String
});