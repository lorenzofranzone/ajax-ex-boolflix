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
      // Handlebars injection
      var context = {
        title: singleMovie.title,
        original_title: singleMovie.original_title,
        original_language: printLangFlags(singleMovie.original_language),
        vote_average: printStars(singleMovie.vote_average)
      };
      var html = template(context);
      $('.container').append(html);
      console.log('lang: ' + singleMovie.original_language);
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

  // FX Print Stars
  function printStars(num) {
    num = Math.ceil(num / 2);
    var string = '';
    for (var i = 1; i <= 5; i++) {
      if (i < num) {
        string += '<i class="fas fa-star"></i>';
      } else {
        string += '<i class="far fa-star"></i>';
      }
    }
    return string;
  } // FX Print Stars

  // FX Print Lang Flags
  function printLangFlags(string) {
    var langs = [
      'ad','ae','af','ag','ai','al','am','ao','aq','ar','as','at','au','aw','ax','az','ba','bb','bd','be','bf','bg','bh','bi','bj','bl','bm','bn','bo','bq','br','bs','bt','bv','bw','by','bz','ca','cc','cd','cf','cg','ch','ci','ck','cl','cm','cn',
      'co','cr','cu','cv','cw','cx','cy','cz','de','dj','dk','dm','do','dz','ec','ee','eg','eh','er','es','et','eu','fi','fj','fk','fm','fo','fr','ga','gb','gd','ge','gf','gg','gh','gi','gl','gm','gn','gp','gq','gr','gs','gt','gu','gw','gy','hk','hm','hn','hr','ht','hu','id','ie','il','im','in','io','iq','ir','is','it','je','jm','jo','jp','ke','kg','kh','ki','km','kn','kp','kr','kw','ky','kz','la','lb','lc','li','lk','lr','ls','lt','lu','lv','ly','ma','mc','md','me','mf','mg','mh','mk','ml','mm','mn','mo','mp','mq','mr','ms','mt','mu','mv','mw','mx','my','mz','na','nc','ne','nf','ng','ni','nl','no','np','nr','nu','nz','om','pa','pe','pf','pg','ph','pk','pl','pm','pn','pr','ps','pt','pw','py','qa','re','ro','rs','ru','rw','sa','sb','sc','sd','se','sg','sh','si','sj','sk','sl','sm','sn','so','sr','ss','st','sv','sx','sy','sz','tc','td','tf','tg','th','tj','tk','tl','tm','tn','to','tr','tt','tv','tw','tz','ua','ug','um','un','us','uy','uz','va','vc','ve','vg','vi','vn','vu','wf','ws','xk','ye','yt','za','zm','zw'
    ];
    // var en = 'en';
    if (string == 'en') {
      string = 'gb';
    }
    if (langs.includes(string)) {
      string = '<span class="flag-icon flag-icon-' + string + '"></span>';
    }
    return string;
  }

//////////
});
