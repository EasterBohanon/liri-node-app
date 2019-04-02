
require("dotenv").config();

const Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");


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
    let artist = userInput;
    console.log(artist);
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryURL).then(
        function (response) {
            var jsonData = response.data;
            if (command === "concert-this") {
                var logData = [];
                logData.push("Here are the upcoming Concerts for " + artist);
                for (var i = 0; jsonData.length; i++) {
                    var show = jsonData[i];
                    logData.push(
                        show.venue.city +
                        "," +
                        (show.venue.region || show.venue.country) +
                        " at " +
                        show.venue.name +
                        " " +
                        moment(show.datetime).format("MM/DD/YYYY")
                    );
                    console.log(logData.join("\n"));
                    printInfo(logData.join("\n"));

                }
            } else if (!data) {
                console.log("sorry fam can't find anything for " + artist);
            }
        }
    
    )}

    concert();

    function movie() {
        let movie = userInput;
        movieURL = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=full&tomatoes=true&apikey=66c1094e"
        if (command === "movie-this") {
            axios.get(movieURL).then(function (response) {
                var jsonData = response.data;
                console.log("Title: " + jsonData.Title);
                console.log("Year: " + jsonData.Year);
                console.log("Rated: " + jsonData.Rated);
                console.log("IMDB Rating: " + jsonData.imdbRating);
                console.log("Country: " + jsonData.Country);
                console.log("Language: " + jsonData.Language);
                console.log("Plot: " + jsonData.Plot);
                console.log("Actors: " + jsonData.Actors);
                console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
            });

        }
    }
    movie();

    function printInfo() {
        if (command === "do-what--it-says") {
            fs.appendFile("log.txt", JSON.stringify(data) + "\n", function (err) {
                if (err) {
                    return console.log(err);
                }

                console.log("log.txt was updated!");
            });
        }
    }
    printInfo();