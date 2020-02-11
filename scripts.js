$(document).ready(function(){

  // Code
  // Click on button
  $(document).on('click', 'button', function(){
    search();
  }) // Click Button

  // Keypress on input
  $('input').keypress(function(event){
    var userQuery = $('input').val();
    if (event.which == 13) {
      search();
    }
  });


  //////////////////////////////////////////////////
  // F U N C T I O N S
  //////////////////////////////////////////////////

  // ––––––––––––––––––––––––––––––––––––––––––––––––––
  // FX RESET SEARCH
  function resetSearch() {
    $('.container-films').html('');
    $('.container-tvs').html('');
    $('input').val('');
  } // FX RESET SEARCH



  // ––––––––––––––––––––––––––––––––––––––––––––––––––
  // FX SEARCH
  function search() {
    var userQuery = $('input').val();
    resetSearch();
    var apiKey = '6553c54bc5bb11e2f515434399a316b3';
    var urlMovies = 'https://api.themoviedb.org/3/search/movie';
    var urlTvs = 'https://api.themoviedb.org/3/search/tv';
    var typeMovie = 'film';
    var typeTv = 'tv';
    getData(userQuery, apiKey, urlMovies, typeMovie, '.container-films');
    getData(userQuery, apiKey, urlTvs, typeTv, '.container-tvs');
  } // FX SEARCH



  // ––––––––––––––––––––––––––––––––––––––––––––––––––
  // FX GET DATA
  function getData(string, apiKey, url, type, container) {
    $.ajax({
      url : url,
      method : 'GET',
      data : {
        api_key : apiKey,
        query : string,
        language : 'it-IT'
      },
      success : function(data) {
        // If there is results
        if (data.total_results > 0) {
          var results = data.results;
          printResults(type, results);
        }
        else {
          printNoResult($(container));
        }
      }, // success
      error : function(request, state, errors) {

      }
    })
  } // FX GET FILMS



  // ––––––––––––––––––––––––––––––––––––––––––––––––––
  // FX PRINT NO RESULT
  function printNoResult(container) {
    // Handlebars source
    var source = $('#no-result-template').html();
    var template = Handlebars.compile(source);
    // Handlebars injection
    var html = template();
    container.append(html);
  } // FX PRINT MOVIES



  // ––––––––––––––––––––––––––––––––––––––––––––––––––
  // FX PRINT STARS
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
  } // FX PRINT STARS



  // ––––––––––––––––––––––––––––––––––––––––––––––––––
  // FX PRINT LANG FLAGS
  function printLangFlags(string) {
    var langs = [
      'ad','ae','af','ag','ai','al','am','ao','aq','ar','as','at','au','aw','ax','az','ba','bb','bd','be','bf','bg','bh','bi','bj','bl','bm','bn','bo','bq','br','bs','bt','bv','bw','by','bz','ca','cc','cd','cf','cg','ch','ci','ck','cl','cm','cn','co','cr','cu','cv','cw','cx','cy','cz','de','dj','dk','dm','do','dz','ec','ee','eg','eh','er','es','et','eu','fi','fj','fk','fm','fo','fr','ga','gb','gd','ge','gf','gg','gh','gi','gl','gm','gn','gp','gq','gr','gs','gt','gu','gw','gy','hk','hm','hn','hr','ht','hu','id','ie','il','im','in','io','iq','ir','is','it','je','jm','jo','jp','ke','kg','kh','ki','km','kn','kp','kr','kw','ky','kz','la','lb','lc','li','lk','lr','ls','lt','lu','lv','ly','ma','mc','md','me','mf','mg','mh','mk','ml','mm','mn','mo','mp','mq','mr','ms','mt','mu','mv','mw','mx','my','mz','na','nc','ne','nf','ng','ni','nl','no','np','nr','nu','nz','om','pa','pe','pf','pg','ph','pk','pl','pm','pn','pr','ps','pt','pw','py','qa','re','ro','rs','ru','rw','sa','sb','sc','sd','se','sg','sh','si','sj','sk','sl','sm','sn','so','sr','ss','st','sv','sx','sy','sz','tc','td','tf','tg','th','tj','tk','tl','tm','tn','to','tr','tt','tv','tw','tz','ua','ug','um','un','us','uy','uz','va','vc','ve','vg','vi','vn','vu','wf','ws','xk','ye','yt','za','zm','zw'
    ];
    // Change "en" Lang
    if (string == 'en') {
      string = 'gb';
    }
    // Print Flags
    if (langs.includes(string)) {
      string = '<span class="flag-icon flag-icon-' + string + '"></span>';
    }
    return string;
  } // FX PRINT LANG FLAGS



  // ––––––––––––––––––––––––––––––––––––––––––––––––––
  // FX PRINT RESULTS
  function printResults(type, results) {
    var title;
    var originalTitle;
    // Handlebars source
    var source = $('#movies-template').html();
    var template = Handlebars.compile(source);
    // Loop - Get Single Movie
    for (var i = 0; i < results.length; i++) {
      var singleResult = results[i];
      if (type == 'film') {
        title = singleResult.title;
        originalTitle = singleResult.original_title;
        var container = $('.container-films');
      }
      else if (type == 'tv') {
        title = singleResult.name;
        originalTitle = singleResult.original_name;
        var container = $('.container-tvs');
      }

      // Handlebars injection
      var context = {
        poster: printPoster(singleResult.poster_path, title),
        type: type,
        title: title,
        original_title: originalTitle,
        original_language: printLangFlags(singleResult.original_language),
        vote_average: printStars(singleResult.vote_average)
      };
      var html = template(context);
      container.append(html);
      console.log('lang: ' + singleResult.original_language);
    } // Loop - Get Single Movie
  } // FX PRINT MOVIES

  // ––––––––––––––––––––––––––––––––––––––––––––––––––
  // FX PRINT POSTER
  function printPoster(posterPath, title) {
    var posterImg;
    var urlBaseImg = 'https://image.tmdb.org/t/p/w342/';
    if(posterPath == null) {
      posterImg = '<img src="default-poster.png" alt="' + title + '">';
    }
    else {
      posterImg = '<img src="' + urlBaseImg + posterPath + '" alt="' + title + '">';
    }
    return posterImg;
  } // FX PRINT POSTER

  // https://image.tmdb.org/t/p/w342/
  // w342



//////////
});
