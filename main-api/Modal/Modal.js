const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
	name:String,
	color:String,
	quality:String,
	superpower:String
});

module.exports = mongoose.model('Hero',heroSchema);