import Entity from './entity';
import Bullet from './bullet';
import Ship from './ship';

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

  // let bullet = new Bullet (
  //   'images/sprites.png',
  //   [10, 10], 
  //   10, 
  //   [1, 0], 
  //   player
  // );

  var upPressed = false;
  var downPressed = false;
  var leftPressed = false;
  var rightPressed = false;
  var spacePressed = false;

  let lastFire = Date.now();

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
    } else if (e.keyCode == 32) {
      spacePressed = true;
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
    } else if (e.keyCode == 32) {
      spacePressed = false;
    }
  }

  let bullets = [];
  
  const render = (modifier) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.render(ctx);
    
    bullets.forEach(bullet => {
      bullet.render(ctx);
      bullet.pos[0] = (bullet.pos[0] + 10);
    });
    


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
    
    if(spacePressed && (Date.now() - lastFire > 50)) {
      let bullet = new Bullet("images/sprites.png", [10, 10], 600, [1, 0], player);
      bullets.push(bullet);
      lastFire = Date.now();
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



  