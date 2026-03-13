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
if(sound){
sound.currentTime = 0;
sound.play();
}
}
}
});

/* NEXT BUTTON */

$("#nextBtn").on("click", function(){
$("#flipbook").turn("next");
});

/* PREVIOUS BUTTON */

$("#prevBtn").on("click", function(){
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

const fullscreenBtn = document.getElementById("fullscreenBtn");
const bookContainer = document.querySelector(".book-container");

fullscreenBtn.onclick = function(){

if(bookContainer.requestFullscreen){
bookContainer.requestFullscreen();
}

bookContainer.classList.add("reader-mode");

};

document.addEventListener("fullscreenchange", function(){

if(!document.fullscreenElement){
bookContainer.classList.remove("reader-mode");
}

});