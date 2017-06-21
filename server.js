var express = require("express");
var config = require('./config');
var morgan = require("morgan");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var app = express();

mongoose.connect(config.database, function(err){
 	if(err){
		console.log("Unable to conect to database...");
		console.log("... " + config.database);
	} else {
		console.log("Connected to database");
	}
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));

var api = require('./app/routes/api')(app, express);
app.use('/api', api);

app.use(express.static(__dirname + '/public'));

app.get('*', function(req, res){
	console.log("Hello World..!")
	res.sendFile(__dirname + "/public/app/views/index.html");
});

app.listen(config.port, function(err){
	if(err)
		console.log(err);
	else
		console.log("Listening on port " + config.port);
});

