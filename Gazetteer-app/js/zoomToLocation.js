function success(data) {
 var apikey = 'a0cac1c743a343c6a85d6aa791b86ca1';
  var latitude = data.coords.latitude;
  var longitude = data.coords.longitude;


  let district_boundary = new L.geoJson();
district_boundary.addTo(map); //adding country_boundry to map


  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + apikey
    + '&q=' + encodeURIComponent(latitude + ',' + longitude)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#forward

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){
       var redMarker = L.ExtraMarkers.icon({
shape: 'circle',
markerColor: 'red',
prefix: 'fas',
icon: 'fa-location-arrow',
iconColor: '#fff',
number: '',
svg: true,


    /*iconSize:     [38, 95], // size of the icon
    iconAnchor:   [11, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor*/
  });
      // Success!
      var data = JSON.parse(request.responseText);
      var marker = L.marker(L.latLng(latitude,longitude), {icon: redMarker}).addTo( map ) // print the location
      .bindPopup("You're here");

      map.setView([latitude, longitude], 5.1)

$.ajax({
  dataType: "json",
  url: "php/getgeoJson.php",
  type: "post",
  data: {routine: "getgeoJson"},

  success: function (data) {
    var sorted = data.features;
    console.log(data)





      //district_boundary.addData(data); //adding each feature to district_boundary
         var point = turf.point([longitude,latitude]);

         $(data.features).each(function (key, data) {


             var temp_layer = turf.booleanWithin(point,data)
             console.log(temp_layer)
             if(temp_layer==true){
                 console.log(data)

                 let highlight_boundary = new L.geoJson(data,highstyle());
                 highlight_boundary.addTo(map);
             }
         });
  },
}).error(function () {});


//Higlight style
function highstyle() {
  return {
    fillColor: "blue",
    weight: 1,
    opacity: 0.6,
    color: "white", //Outline color
    fillOpacity: 0.6,
  };
}




    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request
}

navigator.geolocation.getCurrentPosition(success, console.error)
