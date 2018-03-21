document.getElementById("heading").innerHTML="Weather App";
document.getElementById("heading").style.color="blue";
var localStorageElement = JSON.parse(localStorage.getItem('city'));
window.addEventListener("keydown",keyPress);
displayStorage();

var api="a2e9596c1562b7c67158e50335492957";

function displayStorage(){
  if(localStorageElement!=null){
    $("#prevSearch").html("Previous Searches");
    $("#lslist").empty();
    localStorageElement.forEach(function(city){
      $("#lslist").append("<li>"+city+"</li>");
    });
  }
}

function emptyResults(){
  $("#results").empty();
}

function printResults(data){
var cityname="<tr><td>City Name</td><td>"+data.name+"</td></tr>";
var temp = "<tr><td>Temperature</td><td>"+(data.main.temp-273).toFixed(2)+"&#176; C</td></tr>"
var wind = "<tr><td>Wind Speed</td><td>"+data.wind.speed+"m/s</td></tr>"
var humi = "<tr><td>Humidity</td><td>"+data.main.humidity+"%</td></tr>"
var pres = "<tr><td>Pressure</td><td>"+data.main.pressure+"hPa</td></tr>"
$("#results").append(cityname);
$("#results").append(temp);
$("#results").append(wind);
$("#results").append(humi);
$("#results").append(pres);
}

function findWeather(){
  var cityname=document.getElementById("city").value;
  $.get("http://api.openweathermap.org/data/2.5/weather?q="+cityname+"&appid="+api,function(){

  })
  .done(function(data){
    console.log(data);
    emptyResults();
    printResults(data);
    if(localStorageElement==null){
      localStorageElement = [];
    }
    if(!localStorageElement.includes(cityname)){
      if(localStorageElement.length>=5){localStorageElement.pop();}
      localStorageElement.unshift(cityname);
      localStorage.setItem('city', JSON.stringify(localStorageElement));
    }
    displayStorage();
  })
  .fail(function(){
alert("Invalid City");
  });
}

function findMyWeather(){
	 if (navigator.geolocation) {
	    navigator.geolocation.getCurrentPosition(function(position){
          var lat=position.coords.latitude;
          var lon=position.coords.longitude;
          $.get("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid="+api,function(data){
              console.log(data);
              emptyResults();
              printResults(data);
          });
  });
	}
}

function keyPress(e){
  if(e.keyCode==13){
    findWeather();
  }
}
