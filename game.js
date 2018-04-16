

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.fillStyle = 'black';
ctx.fillRect(0, 0, canvas.width, canvas.height);


// include images

var playerReady = false;
var playerImage = new Image();
playerImage.onload = () => {
  playerReady = true;
};

playerImage.src = "images/Mother.bmp";

var player = {
  speed: 256, 
  x: 0, 
  y: 0
};

var keysDown = {};

addEventListener("keydown", (e) => {
  keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", (e) => {
  delete keysDown[e.keyCode];
}, false );

