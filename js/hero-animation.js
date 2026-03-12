(function(){

const canvas = document.getElementById("hero-canvas");
if(!canvas) return;

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
let meteors = [];
let mouse = {x:null,y:null};

window.addEventListener("resize",()=>{
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
init();
});

window.addEventListener("mousemove",(e)=>{
mouse.x = e.x;
mouse.y = e.y;
});

class Star{
constructor(){
this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height;
this.radius=Math.random()*1.5;
this.speed=Math.random()*0.5;
}

update(){
this.y+=this.speed;
if(this.y>canvas.height){
this.y=0;
this.x=Math.random()*canvas.width;
}
}

draw(){
ctx.beginPath();
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
ctx.fillStyle="white";
ctx.fill();
}
}

class Meteor{
constructor(){
this.x=Math.random()*canvas.width;
this.y=Math.random()*canvas.height/2;
this.length=Math.random()*80+50;
this.speed=Math.random()*8+4;
}

update(){
this.x+=this.speed;
this.y+=this.speed;

if(this.x>canvas.width||this.y>canvas.height){
this.x=Math.random()*canvas.width;
this.y=0;
}
}

draw(){
ctx.beginPath();
ctx.moveTo(this.x,this.y);
ctx.lineTo(this.x-this.length,this.y-this.length);
ctx.strokeStyle="rgba(0,255,255,0.8)";
ctx.lineWidth=2;
ctx.stroke();
}
}

function init(){
stars=[];
meteors=[];

for(let i=0;i<200;i++){
stars.push(new Star());
}

for(let i=0;i<5;i++){
meteors.push(new Meteor());
}
}

function animate(){

ctx.fillStyle="rgba(5,5,20,0.8)";
ctx.fillRect(0,0,canvas.width,canvas.height);

stars.forEach(s=>{
s.update();
s.draw();
});

meteors.forEach(m=>{
m.update();
m.draw();
});

if(mouse.x&&mouse.y){

let gradient=ctx.createRadialGradient(
mouse.x,mouse.y,0,
mouse.x,mouse.y,120
);

gradient.addColorStop(0,"rgba(0,255,255,0.3)");
gradient.addColorStop(1,"transparent");

ctx.fillStyle=gradient;
ctx.beginPath();
ctx.arc(mouse.x,mouse.y,120,0,Math.PI*2);
ctx.fill();

}

requestAnimationFrame(animate);
}

init();
animate();

})();

