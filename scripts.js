$(document).ready(function(){

  // Code
  // Click on button
  $(document).on('click', 'button', function(){
    var userQuery = $('input').val();

    resetSearch();
    getMovies(userQuery);

  }) // Click Button

  // Keypress on input
  $('input').keypress(function(event){
    var userQuery = $('input').val();
    if (event.which == 13) {
      resetSearch();
      getMovies(userQuery);
    }
  });


  //////////////////////////////////////////////////
  // F U N C T I O N S
  //////////////////////////////////////////////////

  // FX Print Movies
  function printMovies(movies) {
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
    } // Loop - Get Single Movie
  } // FX Print Movies


  // FX Reset search
  function resetSearch() {
    $('.container').html('');
    $('input').val('');
  } // FX Reset search

  // FX Get Movies
  function getMovies(userQuery) {
    var url = 'https://api.themoviedb.org/3/search/movie';
    var apiKey = '6553c54bc5bb11e2f515434399a316b3';

    $.ajax({
      url : url,
      method : 'GET',
      data : {
        api_key : apiKey,
        query : userQuery,
        language : 'it-IT'
      },
      success : function(data) {
        var movies = data.results;
        printMovies(movies);
      }, // success
      error : function(request, state, errors) {

      }
    })
  } // FX Get Movies

//////////
});
