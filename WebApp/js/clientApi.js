function callMeBaby(url, method, options) {
	var url = 'http://localhost:8080' + url;
	return $.ajax({
		'url': url,
		'data': options,
		'method': method
	});
}

function callSAP(extra){
	var url = 'https://match.cfapps.us10.hana.ondemand.com/match/' + extra;
	return $.ajax({
		'url': url,
		'method': 'GET'
	});
}

/**
*session functions
**/
function getSessionInfo(sessionName) {
	var url = '/session/sessionInfo';
	var method = 'GET';

	var options = {
		'sessionName': sessionName
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

function generateSession(sessionName) {
	var url = '/session/generateSession';
	var method = 'POST';

	var options = {
		'sessionName': sessionName
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

function addUser(sessionName, username) {
	var url = '/session/addUser';
	var method = 'POST';

	var options = {
		'sessionName': sessionName,
		'username': username
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

function updateUserList(sessionName, username, wishlistIndex) {
	var url = '/session/updateUserList';
	var method = 'PUT';

	var options = {
		'sessionName': sessionName,
		'username': username,
		'wishlist': wishlistIndex
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

function startMatch(sessionName) {
	var url = '/session/sessionInfo';
	var method = 'GET';

	var options = {
		'sessionName': sessionName
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
		var mems = result.members.map(function(member) {
			return member.username;
		});
		mems = mems.join(',');
		callSAP(mems)
		.done(function(res) {
			var url = '/session/match';
			var method = 'POST';

			var options = {
				'sessionName': sessionName,
				'match': res
			};

			callMeBaby(url, method, options)
			.done(function(result) {
				console.log(result);
			});
		})
	});
}

function getAssignedMatch(sessionName, username) {
	var url = '/session/assignedMatch';
	var method = 'GET';

	var options = {
		'sessionName': sessionName,
		'username': username
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

/**
*user functions
**/
function createUser(username) {
	var url = '/user/create';
	var method = 'POST';

	var options = {
		'username': username
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

function getWishlists(username, index) {
	var url = '/user/wishlists';
	var method = 'GET';

	var options = {
		'username': username,
		'index': index || null
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

function addWishlist(username, wishlist) {
	var url = '/user/wishlists';
	var method = 'POST';

	var options = {
		'username': username,
		'wishlist': wishlist
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

function updateWishlist(username, index, wishlist) {
	var url = '/user/wishlists';
	var method = 'PUT';

	var options = {
		'username': username,
		'index': index,
		'wishlist': wishlist
	};

	callMeBaby(url, method, options)
	.done(function(result) {
		console.log(result);
	});
}

function deleteWishlist(username, listIndex) {

}