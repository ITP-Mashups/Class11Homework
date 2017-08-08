 /*
 * Authorization flow adapted from jmperez:
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 * https://github.com/spotify/web-api-auth-examples/blob/master/client_credentials/app.js
 */

// clientId: 'f9078bb1105f4dc7855c763db36c646a', clientSecret: 'b43e1d39a6464daea57eec1ccd38eda3'
// college dropout album uri - spotify:album:3ff2p3LnR6V7m6BinwhNaQ
// spotify:user:partyjail:playlist:7fdVPNatBjc127f3DF0Cd9

// include required libraries
var express = require('express');
var app = express();
var http = require('http').Server(app);
var request = require('request');
var io = require('socket.io')(http);

// express setup
app.use(express.static('public'));
app.get('/', function(req, res){
  res.sendfile('index.html');
});

app.get('/session/:name', function(req, res){
  res.send('ayeeee '+req.params.name);
});

// global variable for capturing content ID
var contentID = "";

function searchSpotify(searchTerm) {

  // spotify deets
  var client_id = 'f9078bb1105f4dc7855c763db36c646a';
  var client_secret = 'b43e1d39a6464daea57eec1ccd38eda3';

  // create URL from search term
  var cleanSearchTerm = searchTerm.replace(" ", "%20");
  var searchURL = 'https://api.spotify.com/v1/search?q=' + cleanSearchTerm + '&type=album';

  // authorization request
  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
    },
    form: {
      grant_type: 'client_credentials'
    },
    json: true
  };

  console.log('Making request!');

  // spotify request for content ID
  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      // use the access token to access the Spotify Web API
      var token = body.access_token;
      var options = {
        url: searchURL,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      
      request.get(options, function(error, response, body) {
        
        // capture content 
        contentID = body.albums.items[0].uri;
        console.log('content ID acquired: ', contentID);
        
        // send results via socket    
        io.emit('search', 
        {
          contentID: contentID,
        });
      });
    }
  });

}

// socket connection
io.on('connection', function(socket){
  console.log('A user connected');

  //Send a message after a timeout of 4seconds
  setTimeout(function(){
    socket.send('Sent a message 4seconds after connection!');
  }, 4000);
  

  socket.on('disconnect', function () {
    console.log('A user disconnected');
  });

  // SEARCH EVENTS //

  // socket listener for searching by users
  socket.on('search', function(data){
    console.log('Search term: ', data.searchTerm);

    // execute search
    searchSpotify(data.searchTerm);

    // // send results via socket    
    io.emit('search', 
    {
      contentID: contentID,
    });
  });

  // CHAT EVENTS //

  // msg to all users (console for debug)
  socket.on('chat message', function(data){
    console.log('user: ' + data.username);
    console.log('message: ' + data.message);
    io.emit('chat message', data); 
  });


});

// ip at home - 192.168.0.8:3323
http.listen(3323, '0.0.0.0', function(){
  console.log('listening on *:3323');
});



