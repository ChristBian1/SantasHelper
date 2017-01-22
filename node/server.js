var http = require('http');
var xRequest = require('request');
var express = require('express');
var Promise = require('bluebird');
var app = express();
var bodyParser = require('body-parser');
var mongo = require('./database.js');
var db = new mongo();
var path = require('path');

app.use(express.static(__dirname + '/../WebApp'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send("OK");
});

/**
* Gets the information about the session based on session ID
* @params sessionName
**/
app.get('/session/sessionInfo', function(req, res) {
	var session = req.query.sessionName;
	if (!session) res.sendStatus(401);

	db.findSession(session, function(err, sess) {
		if (err) res.sendStatus(401);
		res.send(sess);
	});
});

/**
* Generates a session with unique ID
* @params sessionName
* optional:
* @params date as {day, month, year}
* @params maxPrice
**/
app.post('/session/generateSession', function (req, res) {
	var name = req.body.sessionName;
	if (!name) res.sendStatus(400);
	else {
		db.createSession(req.body, function(error, session) {
			if (error) res.send("Please try another name");
			else res.sendStatus(200);
		});		
	}
});

/**
* Add user to a session
* @params sessionName
* @params username
* @params wishlist (the index position of the wishlist they selected)
**/
app.post('/session/addUser', function (req, res) {
	var session = req.body.sessionName;
	var user = req.body.username;
	var option = req.body.wishlist || null;
	if (!session) res.sendStatus(401);
	else {
		db.findSession(session, function(err, sess) {
			sess.addMember(user, option);
		});
		res.send(200);
	}
});

/**
* updates user description for a session
* @params username
* @params wishlist index
* @params sessionName
**/
app.put('/session/updateUserList', function(req, res) {
	var user = req.body.username;
	var option = req.body.wishlist;
	var session = req.body.sessionName;

	if (!user || !session || !option) res.sendStatus(401);
	else {
		//replace the users giftOptions for the session
		db.findSession(session, function(err, sess) {
			sess.updateUserList(user, option);
			res.sendStatus(200);
		});
	}
});

/**
* Assigns matches within the session
* @params sessionName
**/
app.post('/session/match', function(req, res) {
	var session = req.body.sessionName;
	var matchObj = req.body.match;
	if (!session) res.sendStatus(401).end();
	else {
		db.findSession(session, function(err, sess) {
			Object.keys(matchObj).forEach(function(key) {
				sess.assignMember(key, matchObj[key]);
			});
			res.sendStatus(200);
		});
	}
});

/**
* Returns info about the assigned match for that session
* @params username
* @params sessionName
**/
app.get('/session/assignedMatch', function(req, res) {
	var session = req.query.sessionName;
	var user = req.query.username;
	if (!session) res.sendStatus(401).end();
	else {
		db.findSession(session, function(err, sess) {
			var assignedTo = sess.getAssigned(user);
			res.send(assignedTo);
		});
	}
});

/**************************/

//Now the users table endpoints

//create a new user with username
//will return error if username already exists
app.post('/user/create', function(req, res) {
	var user = req.body.username;
	db.createUser(user, function(err, u) {
		if (err) res.status(400).send('please try another username');
		else res.sendStatus(200);
	});
});

/**
* @params username
* optional: @params 'index' of the list
**/
app.get('/user/wishlists', function(req, res) {
	var user = req.query.username;
	var index = req.query.index || null;
	db.findUser(user, function(err, u) {
		if (!index) res.send(u.wishlists);
		else res.send(u.wishlists[index]);
	});
});

//add new wishlist
//whatever format you want
app.post('/user/wishlists', function(req, res) {
	var wishlist = req.body.wishlist;
	var user = req.body.username;

	db.findUser(user, function(err, u) {
		u.addList(wishlist);
		res.sendStatus(200);
	});
});

//update a wishlist
//just send the whole thing with the changes
app.put('/user/wishlists', function(req, res) {
	var wishlist = req.body.wishlist;
	var user = req.body.username;
	var index = req.body.index;

	db.findUser(user, function(err, u) {
		u.updateList(index, wishlist);
		res.sendStatus(200);
	});
});

//delete a wishlist by index
app.delete('/user/wishlists', function(req, res) {

});

var server = app.listen(8080, function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Listening at http://%s:%s", host, port)

});