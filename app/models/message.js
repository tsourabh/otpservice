var mongoose = require('mongoose');
var Schema = mongoose.Schema

var messageSchema = new Schema({

	reciever:{type:Number, required:true},
	otp:{type:String, required:true},
	create: { type:Date, default: Date.now }

});

module.exports = mongoose.model('Message', messageSchema);