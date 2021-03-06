//Google Maps API
var map;
var panorama;
function initMap() {
  var rock = {lat: 35.8860, lng: -81.8845};
  var falls = {lat: 35.949572, lng: -81.926778};
  var wise = {lat: 35.9037, lng: -81.9054};
  var hawk = {lat: 35.913183, lng:  -81.8862201};
  
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 35.9062, lng: -81.9143},
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.TERRAIN
  });
  
  var infoRock = new google.maps.InfoWindow({
    content: "<h3>Table Rock</h3>Table Rock is a mountain in the east rim of Linville Gorge and is a very popular spot for rock climbing. It is perhaps the most recognizable feature at Linville."
  });
  var infoFalls = new google.maps.InfoWindow({
    content: "<h3>Linville Falls</h3>Linville Falls is an incredibly scenic waterfall at Linville Gorge. The waterfall drops 90 feet into the 12 mile river below."
  });
  var infoWise = new google.maps.InfoWindow({
    content: "<h3>Wiseman's View</h3>Wiseman's View is a scenic overlook of Linville Gorge. It is easy to hike to as it is located near some of the wilderness' parking area."
  });
  var infoHawk = new google.maps.InfoWindow({
    content: "<h3>Hawksbill Mountain</h3>Hawksbill Mountain is a 4,009 foot summit. The hike to the top is 1.5 miles roundtrip, making it an accessible yet very scenic spot to hike to."
  });
  
  var markerRock = new google.maps.Marker({
    position: rock,
    map: map,
    title: 'Table Rock'
  });
  var markerFalls = new google.maps.Marker({
    position: falls,
    map: map,
    title: 'Linville Falls'
  });
  var markerWise = new google.maps.Marker({
    position: wise,
    map: map,
    title: "Wiseman's View"
  });
  var markerHawk = new google.maps.Marker({
    position: hawk,
    map: map,
    title: 'Hawksbill Mountain'
  });
  
  markerRock.addListener('click', function(){
    infoRock.open(map, markerRock);
    });
  markerFalls.addListener('click', function(){
    infoFalls.open(map, markerFalls);
    });
  markerWise.addListener('click', function(){
    infoWise.open(map, markerWise);
    });
  markerHawk.addListener('click', function(){
    infoHawk.open(map, markerHawk);
    });
  
  
  panorama = new google.maps.StreetViewPanorama(
      document.getElementById('street-view'),
      {
        position: {lat: 35.9038686, lng: -81.9049645},
        pov: {heading: 250, pitch: -20},
        zoom: 1
      });
}
//Instagram API
function getData(urlvar) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: urlvar,
        
        success: parseData
    })
}
function parseData(json){
  var html = "";
			console.log(json);
			
			$.each(json.data,function(i,data){
                html += '<div class="insta-div">';
                html += '<div class="user">';
                html += '<a href="https://www.instagram.com/' + data.caption.from.username + '">' + '<img class="profile-pic" src="' + data.caption.from.profile_picture + '">';
                html += '<p class="username">' + data.caption.from.username + '</p></a>';
                html += '</div>';
                html += '<div class="pic-caption">';
                html += '<a href="' + data.link + '">';
                html += '<img class="insta-pic" src ="' + data.images.low_resolution.url + '">' + '</a>';
                html += '<p class="likes" id="twitter-link">' + data.likes.count + ' likes</p>'
                html += '</div></div>';
			});
			
			console.log(html);
			$("#insta").append(html);
			
		       
    }
var urlvar = "https://api.instagram.com/v1/tags/linville/media/recent?access_token=2265846943.8f953c7.204268a8772143b3960a4d5dda6f3fc6&callback=?";
getData(urlvar);
//instagram "slideshow"
var i = 0;
var j = 0;
var mq = window.matchMedia( "(max-width: 320px)" );
$("#insta-button").click(function(event){
  if (mq.matches) {
    i = 244 + i;
  }
  else{
    i = 345 + i;
  }
    //Limit display to 15 pictures
    if (i > 5175) {
    i = 5175;
   }
    $("#insta").scrollLeft(i);
  });
$("#insta-back-button").click(function(event){
  // exception for iPhone 5
  if (mq.matches) {
    i = i - 244;
  }
  else{
   i = i - 345; 
  }
  //prevent button from glitching when user hits previous on first "slide"
  if (i <= 0) {
    i = 0;
  }
  $("#insta").scrollLeft(i);
})
//hamburger menu
$( ".cross" ).hide();
$( ".menu" ).hide();
$( ".hamburger" ).click(function() {
$( ".menu" ).slideToggle( "slow", function() {
$( ".hamburger" ).hide();
$( ".cross" ).show();
});
});

$( ".cross" ).click(function() {
$( ".menu" ).slideToggle( "slow", function() {
$( ".cross" ).hide();
$( ".hamburger" ).show();
});
});

