(function(){

const loader = document.getElementById("space-loader");

/* CHECK IF LOADER ALREADY SHOWN */

if(sessionStorage.getItem("loaderShown")){
    loader.style.display = "none";
    return;
}

/* MARK LOADER AS SHOWN */

sessionStorage.setItem("loaderShown","true");

const canvas = document.getElementById("warpCanvas");
if(!canvas) return;

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars=[];

for(let i=0;i<400;i++){
stars.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
z:Math.random()*canvas.width
});
}

function animate(){

ctx.fillStyle="black";
ctx.fillRect(0,0,canvas.width,canvas.height);

for(let i=0;i<stars.length;i++){

let star=stars[i];

star.z-=4;

if(star.z<=0){
star.z=canvas.width;
}

let x=(star.x-canvas.width/2)*(canvas.width/star.z)+canvas.width/2;
let y=(star.y-canvas.height/2)*(canvas.width/star.z)+canvas.height/2;

let size=(1-star.z/canvas.width)*5;

ctx.fillStyle="white";
ctx.fillRect(x,y,size,size);

}

requestAnimationFrame(animate);
}

animate();

/* LOADER FADE OUT */

window.addEventListener("load",()=>{

setTimeout(()=>{

loader.style.opacity="0";

setTimeout(()=>{
loader.style.display="none";
},1000);

},2500);

});

})();