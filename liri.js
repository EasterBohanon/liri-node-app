
require("dotenv").config();

const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);

console.log("Welcome to Liri");

const inputLine = process.argv;
const command = inputLine[2];
var userInput = inputLine.slice(3).join(' ');


// making the command of spotify-this-song a thing
function showSong() {
    const inputLine = process.argv;
    let songChoice = inputLine.slice(3).join(' ');


    if (command === "spotify-this-song") {
        console.log("getting the details of your song, interesting choice");

        spotify.search({ type: "track", query: songChoice }, function (err, data) {
            if (err) {
                return console.log("error occured:" + err);
            } else {
                for (let i = 0; i < data.tracks.items.length; i++) {
                    let song = "Artist: " + data.tracks.items[i].album.artists[0].name + "\nTrack name: " + data.tracks.items[i].name + "\nSpotify link: " + data.tracks.items[i].album.href + "\nAlbum Name: " + data.tracks.items[i].album.name + "\n-------------------------\n";

                    console.log(song);
                }


            }

        });
    } else if (command === undefined) {
        songChoice = "Ace of Base";
        spotify.search({ type: "track", query: songChoice }, function (err, data) {
            if (err) {
                return console.log("Error occured: " + err);
            }

            const defaultSong = "No song? ... here LISTEN TO: " + data.tracks.items[0].album.name + " by " + data.tracks.items[0].album.artists[0].name + "\nGo here to listen: " + data.tracks.items[0].album.href + "\n-------------------------\n"

            console.log(defaultSong);

        });
    }
}
showSong();

function concert() {
    if (command === "concert-this") {
        console.log("okay, we all have unique taste. Not judging just getting your results ........\n");
        var request = require('request');
        request.get("https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp", function (error, response) {
            console.log('error:', error); // Print the error if one occurred
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log(response);
            
        });
    }

}


concert();

function movie() {
    if (command === "movie-this") {
        console.log("Searcing  for your movie");
    }
}
movie();

function printInfo (){
    if (command === "do-what--it-says"){
        console.log("this will read I want it that way but it won't right now");
    }
}
printInfo();