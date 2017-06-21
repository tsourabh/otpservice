var crypto = require("crypto");
var mongoose = require("mongoose");
var Message = require('../models/message');
var Reciever = require('../models/contact');
var client = require('twilio')('ACe38dc5d515b80262f81d7e82859a3793','5f24581349c3cb8703d814bc84b42404');
var config = require("../../config");

function randomValueDec(len){
	return crypto.randomBytes(Math.ceil(len/2)).
		toString('hex').
		slice(0,len);
}

module.exports = function(app, express){

	var api = express.Router();

	api.get('/messages', function(req, res){

		Message.find({}, function(err, messages){
			if(err){
				res.send(err);
				return;
			}

			res.json(messages);
		});
	});

	api.post('/getcontact',function(req, res){

		var reciever = req.body.reciever;

		Reciever.findOne({number:reciever}, function(err, reciever){
			if(err){
				res.send(err);
				return;
			}

			res.json(reciever);
		});
	});

	api.get('/thankyou', function(req, res){
		res.json({
			message:"message has been sent"
		});
	});

	api.post('/sendMessage', function(req, res){
		var reciever = req.body.reciever;
		var body = req.body.content;
		var otp = randomValueDec(6);
		console.log(otp);



		client.messages.create({

	    body: body + ' : ' + otp,
	    to: reciever,  // Text this number
	    from: config.twiliono // From a valid Twilio number
	}, function(err, data){
			if(err)
				console.log(err);
			console.log("message sent..!")
			res.json({
				Success:true,
				message:"message sent.!",
				otp: otp
			});

			var message = new Message({
				sender:config.twiliono,
				reciever:reciever,
				otp:otp
			});

			message.save(function(err){
				if(err){
					console.log(err);
					return;
				} else {
					console.log("Message saved..!");
				}
			});
		})
	.then((message) => console.log(message.sid));

	});

	return api;
}