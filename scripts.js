$(document).ready(function(){

  // Code
  var query = 'Il nome della rosa';

  $.ajax({
      url: 'https://api.themoviedb.org/3/search/movie',
      method: 'GET',
      data: {
        api_key: '6553c54bc5bb11e2f515434399a316b3',
        query: query
        },
      success: function(data) {
        var movies = data.results;
        getMovies(movies);
      }, // Success
      error: function(request, state, errors) {
        console.log(errors);
      } // Error
    }); // ajax


  //////////////////////////////////////////////////
  // F U N C T I O N S
  //////////////////////////////////////////////////

  // FX Get Movies
  function getMovies(movies) {
    // Handlebars source
    var source = $('#movies-template').html();
    var template = Handlebars.compile(source);
    // Loop - Get Single Movie
    for (var i = 0; i < movies.length; i++) {
      var singleMovie = movies[i];
      console.log(singleMovie);
      // Handlebars injection
      var context = {
        title: singleMovie.title,
        original_title: singleMovie.original_title,
        original_language: singleMovie.original_language,
        vote_average: singleMovie.vote_average,
      };
      var html = template(context);
      $('.container').append(html);
    }
  } // FX Get Movies

//////////
});
