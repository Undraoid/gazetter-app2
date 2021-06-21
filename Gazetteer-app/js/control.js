// Description: A simple scale control that shows the scale of the current center of screen in metric (m/km) and imperial (mi/ft) systems
// Source: https://leafletjs.com/reference-1.7.1.html#control-scale
// Implementation: Added Scale at the bottom left of the map.
L.control.scale().addTo(map);

// Description: A basic zoom control with two buttons (zoom in and zoom out)
// Source: https://leafletjs.com/reference-1.7.1.html#control-zoom
// Implementation: Setting Zoom control (+, -) on the top right of the map
map.zoomControl.setPosition("topright");

// Description: A Leaflet control that search markers/features location by custom property.
// Source:  https://github.com/stefanocudini/leaflet-search

/*let controlSearch = new L.Control.Search({
  position: "topleft",
  layer: district_boundary, // name of the layer
  initial: true, // search elements only by initial text
  marker: false, // false for hide
  textPlaceholder: "Search...",
  propertyName: "NAME",
});*/

// This function will execute, when a country is searched and found on control search bar
/*
controlSearch.on("search:locationfound", function (e) {
  district_boundary.eachLayer(function (layer) {
    if (layer.feature.properties.NAME == e.text) {
      let ISO_A2 = layer.feature.properties.ISO_A2;
      highlight_boundary.clearLayers(); //Clears previously selected country
      highlight_boundary.addData(layer.feature); //Adding newly selected country
      map.fitBounds(layer.getBounds()); //Zooming in to country selected
      highlight_boundary.setStyle(highstyle); //Setting style to selected one
      LoadCountryInfo(name); //Calling LoadCountryInfo function from below to get the country's info
    }
  });
});*/

///Range within thousands format
function kFormatter(num) {
    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'K' : Math.sign(num)*Math.abs(num)
}

//Range within millions format
function mFormatter(num){
    return Math.abs(num) > 999999 ? Math.sign(num)*((Math.abs(num)/1000000).toFixed(1)) + 'M' : Math.sign(num)*Math.abs(num)
}

//Range above billion format e.g china, india
function bFormatter(num){
  return Math.abs(num) > 999999999 ? Math.sign(num)*((Math.abs(num)/1000000000).toFixed(1)) + 'B' : Math.sign(num)*Math.abs(num)
}



// Implementation: Added Search control bar for searching countries on the top left of the map
//map.addControl(controlSearch);

//Ajax for loading the country info
function LoadCountryInfo(name) {
  var selectedCountry = $('.scrollbar option:selected').text(); 
  var countryName;
  $.ajax({
    url: "php/getData.php",
    type: "POST",
    data: "country=" + name,
    success: function (response) {
      var output = $.parseJSON(response);
      // let output = JSON.parse(response);
      var countryData = output.countryData;
      countryName = countryData.name;
      var capital = countryData.capital;
      var population = countryData.population;
      var flag = countryData.flag;
      var currency = countryData.currencies[0].name;
      var wiki = 'https://en.wikipedia.org/wiki/'+selectedCountry;
      $(".country_name").text(countryName);
      $(".country_capital").text(capital);
      console.log(population);
      if(population > 1000 && population < 1000000){
        $(".country_population").text(kFormatter(population));
      } if(population > 1000000 && population < 1000000000){
        $(".country_population").text(mFormatter(population));
      } if(population < 1000) { 
        $(".country_population").text(population);
      } if(population > 1000000000){
        $(".country_population").text(bFormatter(population));
      }
      $(".country_flag").attr('src',flag);
      $(".country_currency").text(currency);
      $(".country_wiki").attr('href',wiki);
      $(".country_wiki").text(selectedCountry);

      var coronaData      =  output.coronaData;
      var totalCases      =  coronaData.cases;
      var active          =  coronaData.active;
      var recovered       =  coronaData.recovered;
      var deaths          =  coronaData.deaths;
      var todayCases      =  coronaData.todayCases;
      var todayRecovered  =  coronaData.todayRecovered;
      var todayDeaths     =  coronaData.todayDeaths;
      var activePerOneMillion =  coronaData.activePerOneMillion;
      var recoveredPerOneMillion = coronaData.recoveredPerOneMillion;
           if(totalCases > 1000 && totalCases < 1000000){
        $('.total_cases').text(kFormatter(totalCases));
      } if(population > 1000000 && population < 1000000000){
        $('.total_cases').text(mFormatter(totalCases));
      } if(population < 1000) { 
        $('.total_cases').text(totalCases);
      } if(population > 1000000000){
        $('.total_cases').text(bFormatter(totalCases));
      }
            if(active > 1000 && active < 1000000){
        $('.active_cases').text(kFormatter(active));
      } if(active > 1000000 && active < 1000000000){
        $('.active_cases').text(mFormatter(active));
      } if(active < 1000) { 
        $('.active_cases').text(active);
      } if(active > 1000000000){
        $('.active_cases').text(bFormatter(active));
      }
      if(recovered > 1000 && recovered < 1000000){
        $('.rcvrd').text(kFormatter(recovered));
      } if(recovered > 1000000 && recovered < 1000000000){
        $('.rcvrd').text(mFormatter(recovered));
      } if(recovered < 1000) { 
        $('.rcvrd').text(recovered);
      } if(recovered > 1000000000){
        $('.rcvrd').text(bFormatter(recovered));
      }
      if(deaths > 1000 && deaths < 1000000){
        $('.dths').text(kFormatter(deaths));
      } if(deaths > 1000000 && deaths < 1000000000){
        $('.dths').text(mFormatter(deaths));
      } if(deaths < 1000) { 
        $('.dths').text(deaths);
      } if(deaths > 1000000000){
        $('.dths').text(bFormatter(deaths));
      }
            if(todayCases > 1000 && todayCases < 1000000){
        $('.tdcases').text(kFormatter(todayCases));
      } if(todayCases > 1000000 && todayCases < 1000000000){
        $('.tdcases').text(mFormatter(todayCases));
      } if(todayCases < 1000) { 
        $('.tdcases').text(todayCases);
      } if(todayCases > 1000000000){
        $('.tdcases').text(bFormatter(todayCases));
      }
             if(todayRecovered > 1000 && todayRecovered < 1000000){
        $('.tdrc').text(kFormatter(todayRecovered));
      } if(todayRecovered > 1000000 && todayRecovered < 1000000000){
        $('.tdrc').text(mFormatter(todayRecovered));
      } if(todayRecovered < 1000) { 
        $('.tdrc').text(todayRecovered);
      } if(todayRecovered > 1000000000){
        $('.tdrc').text(bFormatter(todayRecovered));
      }
               if(todayDeaths > 1000 && todayDeaths < 1000000){
        $('.tdths').text(kFormatter(todayDeaths));
      } if(todayDeaths > 1000000 && todayDeaths < 1000000000){
        $('.tdths').text(mFormatter(todayDeaths));
      } if(todayDeaths < 1000) { 
        $('.tdths').text(todayDeaths);
      } if(todayDeaths > 1000000000){
        $('.tdths').text(bFormatter(todayDeaths));
      }
       if(activePerOneMillion > 1000 && activePerOneMillion < 1000000){
        $('.apm').text(kFormatter(activePerOneMillion));
      } if(activePerOneMillion > 1000000 && activePerOneMillion < 1000000000){
        $('.apm').text(mFormatter(activePerOneMillion));
      } if(activePerOneMillion < 1000) { 
        $('.apm').text(activePerOneMillion);
      } if(activePerOneMillion > 1000000000){
        $('.apm').text(bFormatter(activePerOneMillion));
      }
           if(recoveredPerOneMillion > 1000 && recoveredPerOneMillion < 1000000){
        $('.rpm').text(kFormatter(recoveredPerOneMillion));
      } if(recoveredPerOneMillion > 1000000 && recoveredPerOneMillion < 1000000000){
        $('.rpm').text(mFormatter(recoveredPerOneMillion));
      } if(recoveredPerOneMillion < 1000) { 
        $('.rpm').text(recoveredPerOneMillion);
      } if(recoveredPerOneMillion > 1000000000){
        $('.rpm').text(bFormatter(recoveredPerOneMillion));
      }

      var weatherData      =  output.weather_data;
      var avgTemp          =  weatherData[0];
      var tmpMax           =  weatherData[1];
      var tmpMin           =  weatherData[2];
      var pressure         =  weatherData[3];
      var humidity         =  weatherData[4];
      var cloudPercentage  =  weatherData[5];
      var windSpeed        =  weatherData[6];
      var windDegree       =  coronaData.activePerOneMillion;

      $('.avg_temp').text(avgTemp);
      $('.temp_max').text(tmpMax);
      $('.temp_min').text(tmpMin);
      $('.pressure').text(pressure);
      $('.humidity').text(humidity);
      $('.cloud_percentage').text(cloudPercentage);
      $('.wind_speed').text(windSpeed);
      $('.wind_degree').text(windDegree);
      
      var news_data      =  output.news_data;
      //console.log(news_data);
      var newsHtml = '';
      $(".news_tbl").html('');
      for (var i = 0; i <= 10; i++) {
      }
      
      loadMarkers(countryName);
      //$('.center').show();
      $('.loader_main').show();

    },
  });


}


function loadMarkers(country){
  //Add points of interest on map
  var markersLayer = new L.LayerGroup();	//layer contain searched elements
  map.addLayer(markersLayer);

  $.ajax({
  dataType: "json",
  url: "https://www.triposo.com/api/20210317/poi.json?account=ALZSTWFS&token=dd7xqjo5e98okfijb09k7hkca7so5cj1&location_id="+country+"&count=35",
  type: "get",
  //data: {routine: "getPois"},

  success: function (points) {
  
    $('.loader_main').hide();
      console.log(points);
      pois = points.results;
      pois.forEach(function (arrayItem) {
          //console.log(arrayItem.name);
          // if(iso_a2==points.properties.iso_a2){
              var coords = [];
              var name = arrayItem.name;
              //var source_link = arrayItem.attribution[1].url;
              var description = arrayItem.snippet;
        
 var redMarker = L.ExtraMarkers.icon({
shape: 'circle',
markerColor: 'blue',
prefix: 'fas',
icon: 'fa-map-pin',
iconColor: '#fff',
number: '',
svg: true,
   
   
    /*iconSize:     [38, 95], // size of the icon
    iconAnchor:   [11, 50], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor*/
  });

              console.log(arrayItem.name);
              if(arrayItem.images.length==0){
                  var img = "https://upload.wikimedia.org/wikipedia/commons/0/0a/No-image-available.png";
              }
              else{
                  var img = arrayItem.images[0].source_url;
              }
              var popup_content = '<a href="" style="font-size: 16px">'+name+'</a><br><img src="'+img+'" style=" width: 200px;"></img>'+'<br><p>'+description+'</p>';    
        
        
        
              coords.push(arrayItem.coordinates.latitude);
              coords.push(arrayItem.coordinates.longitude);
              var marker = L.marker(L.latLng(coords),{icon: redMarker},{title: name}).addTo( markersLayer );
              marker.bindPopup(popup_content);
              marker.on('click', onClick);    
          // }
      });

  },
  }).error(function () {});
  

  //inizialize Leaflet List Markers
  var list = new L.Control.ListMarkers({layer: markersLayer, itemIcon: null});
  


  list.on('item-mouseover', function(e) {
  e.layer.setIcon(L.icon({
      iconUrl: 'img/select-marker.png'
  }))
  }).on('item-mouseout', function(e) {
  e.layer.setIcon(L.icon({
      iconUrl: L.Icon.Default.imagePath+'/marker-icon.png'
  }))
  });

  function onClick(e) {
      var popup = e.target.getPopup();
      var content = popup.getContent();
   
      console.log(content);
   }

  map.addControl( list );

}