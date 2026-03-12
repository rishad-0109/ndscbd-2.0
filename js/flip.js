$(document).ready(function(){

var sound = document.getElementById("pageSound");

$("#flipbook").turn({
width:500,
height:400,
autoCenter:true,
gradients:true,
elevation:50,

when:{
turning:function(){
sound.currentTime = 0;
sound.play();
}
}
});

$("#nextBtn").click(function(){
$("#flipbook").turn("next");
});

$("#prevBtn").click(function(){
$("#flipbook").turn("previous");
});

});

$('#flipbook').bind('dblclick', function(){

$(this).zoom({
magnify:1.5
});

});

$("#flipbook").swipe({

swipe:function(event, direction){

if(direction=="left"){
$("#flipbook").turn("next");
}

if(direction=="right"){
$("#flipbook").turn("previous");
}

},

threshold:75

});

document.getElementById("fullscreenBtn").onclick = function(){

let elem = document.querySelector(".book-container");

if(elem.requestFullscreen){
elem.requestFullscreen();
}

};