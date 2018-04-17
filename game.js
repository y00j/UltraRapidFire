import Entity from './entity';

document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");


  ctx.fillStyle = 'blue';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  
  var playerReady = true;
  let player = new Entity(
    "images/mother.png", 
    [100, 200], 
    [200, 100], 
    500
  );
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
  
  const render = (modifier) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.render(ctx);
  
    if(upPressed) {
      player.pos[1] -= player.speed * modifier;
    } else if(downPressed) {
      player.pos[1] += player.speed * modifier;
    }
    
    if(leftPressed) {
      player.pos[0] -= player.speed * modifier;
    } else if(rightPressed) {
      player.pos[0] += player.speed * modifier;
    }

  };

  const main = () => {

    const now = Date.now();
    const delta = now - then;

    render(delta /1000);
    then = now;
    requestAnimationFrame(main);
    
  };

  let then = Date.now();
  main();
});



  