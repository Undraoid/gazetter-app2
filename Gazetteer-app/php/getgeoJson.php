<?php

if(isset($_POST['routine'])){
    if($_POST['routine']=='getgeoJson'){
        getgeoJson();
    }
}

function getgeoJson(){
    //Getting info from geoJson file
    echo $data=file_get_contents("countryBorders.geo.json");
}

?>
