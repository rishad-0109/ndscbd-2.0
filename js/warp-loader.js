(function(){

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

window.addEventListener("load",()=>{

setTimeout(()=>{

document.getElementById("space-loader").style.opacity="0";

setTimeout(()=>{
document.getElementById("space-loader").style.display="none";
},1000);

},4500);

});

})();