<?php

$country = $_POST['country'];

//Getting info from restcountries api
$data=file_get_contents("https://restcountries.eu/rest/v2/alpha/$country");

//Attaching data to PHP variables
$data = json_decode($data, true);
$countryData = $data;

//Getting Covid Info
$coronoData = file_get_contents("https://corona.lmao.ninja/v2/countries/$country?yesterday&strict&query");
$coronaData = json_decode($coronoData,true);
 

$wthr_resp = array();
//Getting Weather Info
$weatherData = file_get_contents("http://api.openweathermap.org/data/2.5/weather?q=$capital,$country&APPID=4264d96a45968735df7a8073aa680813");
$weatherData = json_decode($weatherData, true);
$wthr_resp[] = $weatherData['main']['temp'].' kelvin';
$wthr_resp[] = $weatherData['main']['temp_min'].' kelvin';
$wthr_resp[] = $weatherData['main']['temp_max'].' kelvin';
$wthr_resp[] = $weatherData['main']['pressure'].' hPa';
$wthr_resp[] = $weatherData['main']['humidity'].' %';
$wthr_resp[] = $weatherData['clouds']['all'].' %';
$wthr_resp[] = $weatherData['wind']['speed'].' meter/sec';
$wthr_resp[] = $weatherData['wind']['deg'].' degrees';


// Getting News Info 
$newsData = file_get_contents("http://api.mediastack.com/v1/news?country=$country&access_key=977b77fedbfb90b13c3ceae038c50e38&languages=en&countries=us");
$newsData = json_decode($newsData, true);

//Sending data to Javascript 
echo json_encode(array("countryData" => $countryData, "coronaData" => $coronaData,  "weather_data" => $wthr_resp, "news_data" => $newsData));
?>
