<?php

if(isset($_POST['routine'])){
    if($_POST['routine']=='getPois'){
        getPois();
    }
}

function getPois(){
    //Getting info from geoJson file
    echo $data=file_get_contents("points.json");
}

?>
