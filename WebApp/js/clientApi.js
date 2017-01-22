function callMeBaby(url, method, options) {
	var url = 'http://localhost:8080' + url;
	$.ajax({
		'url': url,
		'data': options,
		'method': method
	}).done(function(result) {
		console.log(result);
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

	callMeBaby(url, method, options);
}

function photoClick()
{
		window.location.href="group.html";
}

function photoClick2()
{
		window.location.href="results.html";
}

function generateSession(sessionName) {
	var url = '/session/generateSession';
	var method = 'POST';

	var options = {
		'sessionName': sessionName
	};

	callMeBaby(url, method, options);
}

function addUser(sessionName, username) {
	var url = '/session/addUser';
	var method = 'POST';

	var options = {
		'sessionName': sessionName,
		'username': username
	};

	callMeBaby(url, method, options);
}

function updateUserList(sessionName, username, wishlistIndex) {
	var url = '/session/updateUserList';
	var method = 'PUT';

	var options = {
		'sessionName': sessionName,
		'username': username,
		'wishlist': wishlistIndex
	};

	callMeBaby(url, method, options);
}

function startMatch(sessionName) {
	var url = '/session/startMatch';
	var method = 'POST';

	var options = {
		'sessionName': sessionName
	};

	callMeBaby(url, method, options);
}

function getAssignedMatch(sessionName, username) {
	var url = '/session/assignedMatch';
	var method = 'GET';

	var options = {
		'sessionName': sessionName,
		'username': username
	};

	callMeBaby(url, method, options);
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

	callMeBaby(url, method, options);
}

function getWishlists(username, index) {
	var url = '/user/wishlists';
	var method = 'GET';

	var options = {
		'username': username,
		'index': index || null
	};

	callMeBaby(url, method, options);
}

function addWishlist(username, wishlist) {
	var url = '/user/wishlists';
	var method = 'POST';

	var options = {
		'username': username,
		'wishlist': wishlist
	};

	callMeBaby(url, method, options);
}

function updateWishlist(username, index, wishlist) {
	var url = '/user/wishlists';
	var method = 'PUT';

	var options = {
		'username': username,
		'index': index,
		'wishlist': wishlist
	};

	callMeBaby(url, method, options);
}

function deleteWishlist(username, listIndex) {

}