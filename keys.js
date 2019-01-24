

console.log('this is loaded');

var Spotify = require('node-spotify-api');

var spotify = new Spotify({
    id: "aa35040bf12d4f7a95609e6d8b558752",
    secret: "7d9c4b4f11a046b88dbb5f478ce26a39",
  });
   
  spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
  console.log(data); 
  });

  exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};