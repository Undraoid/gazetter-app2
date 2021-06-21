//Enabling map
let map = L.map("map", {
  attributionControl: false
}).setView([0, 0], 1.5);
//Adding basemap
let layer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	maxZoom: 17,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
map.addLayer(layer);
$('.loader_main').hide();



//Declaring countries table
let countries_tab ='';

//Declaring country_boundry
let district_boundary = new L.geoJson();
district_boundary.addTo(map); //adding country_boundry to map



//Loading geoJson map data using ajax

$.ajax({
  dataType: "json",
  url: "php/getgeoJson.php",
  type: "post",
  data: {routine: "getgeoJson"},

  success: function (data) {
    var sorted = data.features;
    sorted.sort(function (a, b) {
      var textA = a.properties.NAME.toUpperCase();
      var textB = b.properties.NAME.toUpperCase();
      return textA.localeCompare(textB);
    });

  

    $(data.features).each(function (key, data) {
      
      district_boundary.addData(data); //adding each feature to district_boundary
      
      countries_tab +=
        '<option value="'+data.properties.ISO_A2+'">'+data.properties.NAME+'</option>';
    });

    

    //console.log(countries_tab);
    $(".scrollbar").html('');
    $(".scrollbar").html(countries_tab);
    //load current location on map and country in dropdown
  
    district_boundary.setStyle(polystyle); //setting style for country boundries
  },
}).error(function () {});


//Define style
function polystyle(feature) {
  return {
    fillColor: "green",
    weight: 0,
    opacity: 0,
    color: "white", //Outline color
    fillOpacity: 0,
  };
}

//Setting and adding highlight info
let highlight_boundary = new L.geoJson();
highlight_boundary.addTo(map);

//Higlight style
function highstyle(feature) {
  return {
    fillColor: "blue",
    weight: 1,
    opacity: 0.6,
    color: "white", //Outline color
    fillOpacity: 0.3,
  };
}

 /*var lay = L.dbPediaLayer({lang: 'de', includeCities: false}).addTo(map);

//Add points of interest on map
 var markersLayer = new L.LayerGroup();	//layer contain searched elements
 map.addLayer(markersLayer);

 $.ajax({
   dataType: "json",
   url: "php/getPois.php",
   type: "post",
  data: {routine: "getPois"},

  success: function (points) {
   
    $(points.features).each(function (key, points) {
      var coords = [];
      var name = points.properties.name;
     coords.push(points.properties.latitude);
       coords.push(points.properties.longitude);
      L.marker(L.latLng(coords), {title: name}).addTo( markersLayer );

    });

   },
 }).error(function () {});

// //inizialize Leaflet List Markers
 var list = new L.Control.ListMarkers({layer: markersLayer, itemIcon: null});
	
 list.on('item-mouseover', function(e) {
  e.layer.setIcon(L.icon({
    iconUrl: 'images/select-marker.png'
   }))
}).on('item-mouseout', function(e) {
  e.layer.setIcon(L.icon({
     iconUrl: L.Icon.Default.imagePath+'/marker-icon.png'
   }))
 });

map.addControl( list );*/


$('.scrollbar').change(function(){ 
    var iso = $(this).val();
    district_boundary.eachLayer(function (layer) {
    //console.log(layer.feature.properties.ISO_A2);
    if (layer.feature.properties.ISO_A2 == iso) {
      $('[name=scrollbar] option').filter(function() { 
        return ($(this).val() == iso); //To select Blue
      }).prop('selected', true);
      
      highlight_boundary.clearLayers();
      highlight_boundary.addData(layer.feature);
      map.fitBounds(layer.getBounds()); //zoom to country
      highlight_boundary.setStyle(highstyle); // make highlight
      LoadCountryInfo(iso); //loading country info
    }
  });
});

     L.easyButton( 'fa-solid fa-info', function(){
  $('.center').show();
}).addTo(map);

 L.easyButton( 'fa-solid fa-bug', function(btn,map){
   $('#coronoModal').modal('toggle')
}).addTo(map);

L.easyButton( 'fas fa-cloud', function(){
$('#weatherModal').modal('toggle')
}).addTo(map);



