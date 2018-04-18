import Entity from './entity';
import Bullet from './bullet';
import Ship from './ship';
import Enemy from './enemy';
 
document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");


  

  
  let player = new Ship("images/mother.png", [100, 200], [200, 100], 500);
  // let enemy = new Enemy("images/battle_cruiser.png", [])
  
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

  
  const render = (modifier) => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "grey";
    player.render(ctx);
    player.bullets.forEach(bullet => {
      bullet.render(ctx);
    });
    
    player.updateBullets(canvas);


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
      // debugger;
      player.shootBullet();
      lastFire = Date.now();
    }

  };

  const main = () => {
    // debugger;
    const now = Date.now();
    const delta = now - then;

    render(delta /1000);
    then = now;
    requestAnimationFrame(main);
    
  };

  let then = Date.now();
  main();
});



  