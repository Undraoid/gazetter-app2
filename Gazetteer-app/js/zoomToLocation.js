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
       /*var marker = L.marker(L.latLng(latitude,longitude), {icon: redMarker}).addTo( map ) // print the location
       .bindPopup("You're here");*/
 
       map.setView([latitude, longitude], 5.1);
 
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
                  console.log(data.properties.ISO_A2);
 
                  let highlight_boundary = new L.geoJson(data,highstyle());
                  highlight_boundary.addTo(map);
                  $('#countrySelect').val(data.properties.ISO_A2);
                  LoadCountryInfo(data.properties.ISO_A2);



                  function LoadCountryInfo(name) {
                    var selectedCountry = data.properties.NAME;
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
                        
                        //$('.center').show();
                  
                      },
                    });
                  
                  
                  }




              }
          });
   },
 }).error(function () {});

 
 
 //Higlight style
 function highstyle() {
   return {
     fillColor: "#ff7800",
     weight: 2,
     opacity: 0.65,
     color: "white", //Outline color
     fillOpacity: 0.3,
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
 

