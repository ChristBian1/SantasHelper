var mongoose = require('mongoose');

var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var users = new Schema({
    username: {
    	type: String,
    	unique: true,
    	required: true
    },
    wishlists: []
});

users.methods.getWishlists = function() {
	return this.wishlists;
}

users.methods.getList = function(index) {
	return (index < this.wishlists.length) ? this.wishlists[index] : null;
}

users.methods.addList = function(list) {
	this.wishlists.push(list);
	this.save();
}

users.methods.updateList = function(index, list) {
	this.wishlists[index] = list;
	this.save();
}

var User = mongoose.model('user', users);

var sessions = new Schema({
    name: {
    	type: String,
    	unique: true,
    	required: true
    },
    members: [],
    date: Date,
    maxPrice: String
});

sessions.methods.addMember = function(username, list) {
	//create member format
	var member = {
		username: username,
		list: list || null,
		assigned: null
	};
	this.members.push(member);
	this.save();
}

sessions.methods.assignMember = function(receiver, assignedTo) {
	this.members.some(function(member) {
		if (member.username == receiver) {
			member.assigned = assignedTo;
			return true;
		} else {
			return false;
		}
	});

	this.markModified('members');
	this.save();
}

sessions.methods.getAssigned = function(user) {
	var result;
	this.members.forEach(function(member) {
		if (member.username == user) {
			result = member.assigned;
		}
	});

	return result;
}

sessions.methods.updateUserList = function(username, list) {
	this.members.some(function(member) {
		if (member.username == username) {
			member.list = list;
			return true;
		} else {
			return false;
		}
	});

	this.markModified('members');
	this.save();
}

sessions.methods.setMaxPrice = function(price) {
	this.maxPrice = price;
	this.save();
}

sessions.methods.setDate = function(day, month, year) {
	this.date = new Date(year, month, day);
	this.save();
}

var Session = mongoose.model('session', sessions);

mongoose.connect('mongodb://localhost/test');

var db = function() {}

db.prototype.createSession = function(info, callback) {
	var sessObj = {
		'name': info.sessionName,
		'members': [],
		'date': info.date || null,
		'maxPrice': info.maxPrice || null
	};
	var session = new Session(sessObj);
	session.save(callback);
}

db.prototype.createUser = function(username, callback) {
	var userObj = {'username': username};

	var user = new User(userObj);
	user.save(callback);
}

db.prototype.findSession = function(sessionID, callback) {
	Session.findOne({name: sessionID}, callback);
}

db.prototype.findUser = function(username, callback) {
	User.findOne({username: username}, callback);
}

module.exports = db;