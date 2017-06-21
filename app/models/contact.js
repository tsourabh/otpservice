var mongoose = require('mongoose');
var Schema = mongoose.Schema

var recieverSchema = new Schema({
	
	fname:{type:String, required:true},
	lname:{type:String, required:true},
	number:{type:String, required:true}
});

module.exports = mongoose.model('Reciever', recieverSchema);