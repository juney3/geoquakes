// define globals
var monthly_quakes_endpoint = "http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
var googleMaps = "https://maps.googleapis.com/maps/api/js?key=AIzaSyBHLett8djBo62dDXj0EjCimF8Rd6E8cxg&callback=initMap";
let dataHolder = {}

$(document).ready(function() {
  console.log("Let's get coding!");
  // CODE IN HERE!
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.7749, lng: -122.4194},
    zoom: 3
  });

  var quakeSelectedPair = {when: "hour", mag: "4.5"};

  $('#hour').on('click', function(){
    quakeSelectedPair.when = "hour"
    console.log(quakeSelectedPair)
    ajaxCall(map, quakeSelectedPair.when, quakeSelectedPair.mag);
  })
  $('#day').on('click', function(){
    quakeSelectedPair.when = "day"
    console.log(quakeSelectedPair)
    ajaxCall(map, quakeSelectedPair.when, quakeSelectedPair.mag);
  })
  $('#week').on('click', function(){
    quakeSelectedPair.when = "week"
    console.log(quakeSelectedPair)
    ajaxCall(map, quakeSelectedPair.when, quakeSelectedPair.mag);
  })
  $('#month').on('click', function(){
    quakeSelectedPair.when = "month"
    console.log(quakeSelectedPair)
    ajaxCall(map, quakeSelectedPair.when, quakeSelectedPair.mag);
  })

  $('#oneO').on('click', function(){
    quakeSelectedPair.mag = "1.0"
    console.log(quakeSelectedPair)
    ajaxCall(map, quakeSelectedPair.when, quakeSelectedPair.mag);
  })
  $('#twofive').on('click', function(){
    quakeSelectedPair.mag = "2.5"
    console.log(quakeSelectedPair)
    ajaxCall(map, quakeSelectedPair.when, quakeSelectedPair.mag);
  })
  $('#fourfive').on('click', function(){
    quakeSelectedPair.mag = "4.5"
    console.log(quakeSelectedPair)
    ajaxCall(map, quakeSelectedPair.when, quakeSelectedPair.mag);
  })
});

let ajaxCall = function(map, when, mag){
  $.ajax({
    method: 'GET',
    // url: `${monthly_quakes_endpoint}`,
    url: `http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/${mag}_${when}.geojson`,
    success: function(response) {
      response.features.forEach(quakeInfo=>{
        var quakeTitle = quakeInfo.properties.title;
        var quakeLong = quakeInfo.geometry.coordinates[0];
        var quakeLat = quakeInfo.geometry.coordinates[1];
        console.log(response);
        // console.log(quakeTitle);
        // console.log(response);
        $('#info').append(`<p>${quakeTitle}<p>`);

        function createMarker() {
          var magnitude = quakeInfo.properties.mag;

          console.log(magnitude);
          if (magnitude <= 4) {
            var marker = new google.maps.Marker({
              position: {
                lat: quakeLat,
                lng: quakeLong
              },
              map: map,
              title: quakeTitle,
              optimized: false,
              icon: {path: google.maps.SymbolPath.CIRCLE, fillColor: 'yellow', fillOpacity: 1, strokeColor: 'yellow', scale: 3}
            })
          }

          if ((magnitude > 4) && (magnitude <= 5)) {
            var marker = new google.maps.Marker({
              position: {
                lat: quakeLat, lng: quakeLong
              },
              map: map,
              title: quakeTitle,
              optimized: false,
              icon: {path: google.maps.SymbolPath.CIRCLE, fillColor: 'orange', fillOpacity: 1, strokeColor: 'orange', scale: 5}
          })
        }

        if (magnitude > 5) {
          var marker = new google.maps.Marker({
            position: {
              lat: quakeLat, lng: quakeLong
            },
            map: map,
            title: quakeTitle,
            optimized: false,
            icon: {path: google.maps.SymbolPath.CIRCLE, fillColor: 'red', fillOpacity: 1, strokeColor: 'red', scale: 7}
          })
        }
      ]}
      createMarker();

    })
  },
    error: function(a, b, c) {
      console.log(a);
      console.log(b);
      console.log(c);
    }
  });
}
