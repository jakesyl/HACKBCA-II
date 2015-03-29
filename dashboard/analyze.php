<?php
function parse($file){
while (($line = fgetcsv($file)) !== FALSE) {
  //$line is an array of the csv elements
  $ave = ($line[2]+$line[3])/2;
  //echo $ave." ";
}
return($ave);
}
function getStocks($date,$tick){
    $dateSplit = explode("-",$date);

    $month = intval($dateSplit[1])-1;
    if(intval($dateSplit[0])<10 && intval($dateSplit[0])>0){
      $day = "0".$dateSplit[0];
    }
    else {
      $day = $dateSplit[0];
    }
    $year = $dateSplit[2];
    $fp = fopen ("http://ichart.finance.yahoo.com/table.csv?s=".$tick."&d=".$month."&e=".$day."&f=".$year."&g=d&a=".$month."&b=".$day."&c=".$year."&ignore=.csv","r");
    return parse($fp);
}


function gStock($date,$tick){
  $c = 0;
  $data ='"stock":[';
while($c<count($date)){
 $data.= '"observation":{'.getStocks($date[$c],$tick)."}";
 if(($c+1)==count($date)){
   $data.="]";
 }
 else{
   $data.=",";
 }
 $c+=1;
}
return $data;
}
echo gStock(array("9-9-2014","9-4-2014"),"MSFT");


$reddit = preg_replace("/ /","+",$reddit);

$url = "https://loudelement-free-natural-language-processing-service.p.mashape.com/nlp-url/?text=" . $reddit;
$response = Unirest\Request::get($url,
  array(
    "X-Mashape-Key" => "VXBkiZgWYCmshDeQLH3fSHqqxGHWp1ixNsejsnfNJo6tzD7HgD",
    "Accept" => "application/json"
  )
);

?>
