var http = require('http');
var xRequest = require('request');
var express = require('express');
var Promise = require('bluebird');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send("OK");
});

/**
* Gets the information about the session based on session ID
* @params sessionID
**/
app.get('/sessionInfo', function(req, res) {
	var session = req.query.sessionID;

	if (!session) res.sendStatus(401);
	else {
		res.sendStatus(200);
	}
});

/**
* Generates a session with unique ID
**/
app.post('/generateSession', function (req, res) {
	generateSession()
	.then(function(sessionID, error) {
		if (error) res.sendStatus(500);
		else res.send(sessionID);
	});
});

/**
* Generates a session with unique ID
* @params sessionID
* @params giftOptions 
**/
app.post('/addUser', function (req, res) {
	var session = req.body.sessionID;
	var options = req.body.giftOptions;
	if (!session || !options) res.send(401);
	else {
		//if user already exists return error message
		//else success
		res.send(200);	
	}
});

/**
* updates user description for a session
* @params user
* @params giftOptions
* @params sessionID
**/
app.put('/updateUserOptions', function(req, res) {
	var user = req.body.user;
	var options = req.body.giftOptions;
	var session = req.body.sessionID;

	if (!user || !session || !options) res.sendStatus(401);
	else {
		//replace the users giftOptions for the session
		res.sendStatus(200);
	}
});

/**
* Assigns matches within the session
* @params sessionID
**/
app.post('/startMatch', function(req, res) {
	var session = req.body.sessionID;
	if (!session) res.sendStatus(401).end();
	else {
		res.sendStatus(200);
	}
});

/**
* Returns info about the assigned match for that session
* @params user
* @params sessionID
**/
app.get('/assignedMatch', function(req, res) {
	var session = req.query.sessionID;
	var user = req.query.user;
	if (!session) res.sendStatus(401).end();
	else {
		getAssignedMatch(user, session)
		.then(function(data, error) {
			if (error) res.sendStatus(500);
			else res.send(data);
		});
	}
});

/**
* @returns session ID
**/
function generateSession() {
    return new Promise(function(resolve, reject) {
    	resolve('xyz');
    });
}

/**
* @returns assigned match for a session
**/
function getAssignedMatch(user, session) {
    return new Promise(function(resolve, reject) {
    	resolve('temp');
    });
}

var server = app.listen(1337, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Listening at http://%s:%s", host, port)

});