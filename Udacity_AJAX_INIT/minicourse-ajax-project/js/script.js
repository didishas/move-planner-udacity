
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview

    // YOUR CODE GOES HERE!
    var $street = $('#street').val();
    var $city = $('#city').val();
    var $location = $street + ', ' + $city;

        $greeting.text('So, you want to live at ' + $location);
    var $urlLocation = 'http://maps.googleapis.com/maps/api/streetview?size=600x300&location=' + $location;

    $body.append('<img class="bgimg" src="' + $urlLocation + '">');

    // articles

    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    url += '?q=' + $city + '&sort=newest&api-key=c8514ada99d04e3698d40a466fe2e576';

    // 1rst METHOD
    // $.ajax({
    //   url: url,
    //   method: 'GET',
    // }).done(function(result) {
    //   console.log(result);
    //
    //   var $newsPaper = result.response.docs;
    //
    //   for (var i = 0; i < $newsPaper.length; i++) {
    //     $('#nytimes-articles').append('<h4>' + $newsPaper[i].headline.main + '</h4>' + '<p>' + $newsPaper[i].snippet + '</p>' + '<br>');
    //
    //   }
    // }).fail(function(err) {
    //   throw err;
    // });


    //2nd Udacity method
    $.getJSON(url, function (result) {
      $nytHeaderElem.text('New York Times Articles About ' + $city)
      ;

      var $newsPapers = result.response.docs;
      for (var i = 0; i < $newsPapers.length; i++) {
        var newsPaper = $newsPapers[i];
        $nytElem.append('<li class="article">' +
          '<a href="' + newsPaper.web_url + '" target="blank" >' + newsPaper.headline.main +
          '</a>' +
          '<p>' + newsPaper.snippet + '</p>' +
          '</li>');

        };

    })


    return false;
};

$('#form-container').submit(loadData);
