

document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  var playerReady = false;
  var playerImage = new Image();
  playerImage.onload = () => {
    playerReady = true;
  };

  playerImage.src = "images/Mother.bmp";

  var player = {
    speed: 10, 
    x: 0, 
    y: 0
  };


  var x = canvas.width/2;
  var y = canvas.height - 200;
 
  var upPressed = false;
  var downPressed = false;
  var leftPressed = false;
  var rightPressed = false;

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);


  function keyDownHandler(e) {
    if (e.keyCode == 37) {
      leftPressed = true;
    } else if (e.keyCode == 39) {
      rightPressed = true;
    } else if (e.keyCode == 38) {
      upPressed = true;
    } else if (e.keyCode == 40) {
      downPressed = true;
    }
  }

  function keyUpHandler(e) {
    if (e.keyCode == 37) {
      leftPressed = false;
    } else if (e.keyCode == 39) {
      rightPressed = false;
    } else if (e.keyCode == 38) {
      upPressed = false;
    } else if (e.keyCode == 40) {
      downPressed = false;
    }
  }
  
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (playerReady) {
      ctx.drawImage(playerImage, x, y);
  
    }
    
    if(upPressed) {
      y -= player.speed;
    } else if(downPressed) {
      y += player.speed;
    }
    
    if(leftPressed) {
      x -= player.speed;
    } else if(rightPressed) {
      x += player.speed;
    }

  };

  const main = () => {
    render();
    requestAnimationFrame(main);
    
  };

  main();
});



  // var keysDown = {};

  // addEventListener("keydown", (e) => {
  //   keysDown[e.keyCode] = true;
  // }, false);

  // addEventListener("keyup", (e) => {
  //   delete keysDown[e.keyCode];
  // }, false );