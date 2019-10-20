var express = require('express');
var router = express.Router();
var key = require('./keys.js').omdb_api;
var request = require('request');


const { isAuthenticated } = require('../helpers/auth');
var movie = [];
var copias = [];
 /*GET home page. */
router.get('/', function (req, res) {
    res.render('index', { movie: movie });
});

router.post('/', function(req, res){
    var query = req.body.query;
    var url = 'http://www.omdbapi.com/?apikey=' + key + '&s=' + query + '&y=&plot=short&r=json';

    //Clear out movie
     movie = [];

        request(url, function(error, response, body){
        //Check for HTTP Status O
        if (response.statusCode === 200){
            //Convert the body to a JSON object
            //EL JSON ES UNA ESTRUCTURA!!!
            var json = JSON.parse(body);
            console.log(json);
            var entries = json.Search;
            for(var entry_key in entries) {
                // control that property is own by the object (not prototype)
                if(entries.hasOwnProperty(entry_key)) {
                    // do whatever you want with the entry
                    // To access the entry, use this notation:
                    var entry = entries[entry_key];
                    // to stay with OMDb example, this should be: 
                    var movie_title = entry.Title;
                    console.log ("title:", movie_title);
                    var movie_year = entry.Year;
                    console.log("Release Year: " + movie_year);
                    var im = "https://m.imdb.com/title/" + entry.imdbID;
                    console.log("IMdB Rating: " + im);
                    var tipo = entry.Type;
                    console.log("Type: " + tipo);
                    var poster = entry.Poster;
                    console.log("Poster: " + poster);

                }

                if (poster === 'N/A'){

                    poster = '/img/sinPoster2.jpg';
                }
                    movie.push({
                        Title: movie_title,
                        Year: movie_year,
                        imdbID : im,
                        Type: tipo,
                        Poster: poster,
                    });
                    
            }
            console.log ("info en Movie");
            console.log (movie);
            length = Object.keys (movie).length;
            console.log (length);

            //Check if it has an error
            if(json.Error){
                movie = json.Error;
            } 
     } else {
            //We had something other than HTTP OK
            //Push an error to movie and just pass the body
            movie.push({Error: body});
        }

        //Render the index page
        res.render('index', {movie:movie });

    });
    router.get('/comment/add',isAuthenticated ,(req, res) => {
        res.render('comment/new-comment', { movie: movie });
      });
})

module.exports = router;