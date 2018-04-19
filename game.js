import Entity from './entity';
import Bullet from './bullet';
import Ship from './ship';
import Enemy from './enemy';
 
document.addEventListener('DOMContentLoaded', () => {
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  let enemies = [];

  let player = new Ship("images/mother.png", [50, 100], [100, 50], 500);
  let enemy = new Enemy(
    "images/battle_cruiser.png", 
    [200, 170], 
    100, 
    [500, 500],
    [90, 130], 
    [88, 70]
  );
  
  enemies.push(enemy);

  var upPressed = false;
  var downPressed = false;
  var leftPressed = false;
  var rightPressed = false;
  var spacePressed = false;


  let lastFire = Date.now();

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function collides(x, y, r, b, x2, y2, r2, b2) {
    return !(r <= x2 || x > r2 || b <= y2 || y > b2);
  }

  function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);
  }

  function checkCollisions () {
    for(let i = 0; i < player.bullets.length; i++) {
      let pos1 = player.bullets[i].pos;
      let size1 = player.bullets[i].size;

      for(let j= 0; j < enemies.length; j++) {
        let pos2 = enemies[j].pos;
        let size2 = enemies[j].size;

        if(boxCollides(pos1, size1, pos2, size2)) {
          enemies.splice(j, 1);
          j--;
        }
      }

    }
  }

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
    enemies.forEach((enem) => {
      enem.render(ctx);
    });
    player.bullets.forEach(bullet => {
      bullet.render(ctx);
    });
    
    player.updateBullets(canvas);
    checkCollisions();


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
    
    if(spacePressed && (Date.now() - lastFire > 150)) {
      player.shootBullet();
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



  