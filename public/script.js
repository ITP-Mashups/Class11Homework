// do something here eventually

var socket = io();
var i = 0;
var spotifyURI = "";
var playerContent = "";
var contentID = "";

// search for a term
$("#search").click(function(){
	
	// get search term
	var searchTerm = $("#query").val();
	
	// send to server for spotify request
	socket.emit('search', 
	{
		searchTerm: searchTerm,
	});
	
});

// distribute search result and update player
socket.on('search', function(data){
	// receive and log ID
	contentID = data.contentID;
	console.log("received data = ", contentID);
	
	// create new embed URL
	playerContent = "<iframe id = \"player\" src=\"https://open.spotify.com/embed?uri=" + contentID + "\" width=\"300\" height=\"380\" frameborder=\"0\" allowtransparency=\"true\"></iframe>";
	// console.log("player content: ", playerContent);
	$("#player_container").html(playerContent);

});

// send a chat msg
$("#chatSend").click(function(){
	// username
	var username = $('#username').val();
	// message
	var message = $('#chatInput').val()
	socket.emit('chat message', 
	{
		username: username,
		message: message,
	});
    $('#chatInput').val('');
});

// receive msg and update list
socket.on('chat message', function(data){
    $('#messages').append($('<li>').text(data.username + ": " + data.message));
});








