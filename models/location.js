var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var Currency = mongoose.Types.Currency;

// Creat Location Schema
var locationSchema = new Schema({
	latitude: {
		type: String,
		required: true,
		unique: true
	},
	longitude: {
		type: String,
		required: true,
		unique: true
	}
}, {
	timestamps: true
});


var Locations = mongoose.model('Location', locationSchema);
// make this available to our Node Application
module.exports = Locations;