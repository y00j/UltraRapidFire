import Entity from './entity';
import Bullet from './bullet';
import Ship from './ship';
import Enemy from './enemy';
import Explosion from './explosion';
import { request } from 'https';
 
document.addEventListener('DOMContentLoaded', () => {

  let gameIsRunning = true;

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var smallESound = document.getElementById("small-explosion");
  var largeESound = document.getElementById("large-explosion");
  var playerESound = document.getElementById("player-explosion");

  largeESound.volume = 0.15;
  smallESound.volume = 0.5;
  playerESound.volume = 0.15;

  var themeSong = document.getElementById("theme");

  let enemies = [];
  let explosions = [];
  let playerArray = [];



  
  


  var upPressed = false;
  var downPressed = false;
  var leftPressed = false;
  var rightPressed = false;
  var spacePressed = false;


  let lastFire = Date.now();
  let lastEnemyFire = Date.now();

  document.addEventListener("keydown", keyDownHandler, false);
  document.addEventListener("keyup", keyUpHandler, false);

  function collides(x, y, r, b, x2, y2, r2, b2) {
    return (x > (x2 - r) && x < (x2 + r2 + r)) && (y > (y2 - b) && y < (y2 + b2 + b));
  }

  function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1], size[0], size[1], pos2[0], pos2[1], size2[0], size2[1]);
    // return collides(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);

  }

  let player;
  let enemy1;
  let enemy2;

  function loadEntities() {
    player = new Ship("images/main_player.png", [canvas.width / 2 - 25, 500], [50, 40], 500);
    enemy1 = new Enemy("images/mother1.png", [canvas.width / 4 - 33, 50], [75, 100], 100);
    enemy2 = new Enemy("images/mother1.png", [canvas.width * 3 / 4 - 33, 50], [75, 100], 100);
    playerArray.push(player);
    enemies.push(enemy1);
    enemies.push(enemy2);
    themeSong.play();

  }

  function gameover() {
    return enemies.length === 0 || player.lives === 0;
  }

  // function spawnEnemies() {
  //   for(let i = 0; i < enemyCount; i++){
  //     let enemy = new Enemy("images/mother1.png", [canvas.width / 4 - 33, 50], [75, 100], 100);
  //     enemies.push(enemy);
  //   }

  // }

  function checkPlayerBulletCollisions () {
    for(let i = 0; i < player.bullets.length; i++) {
      let pos1 = player.bullets[i].pos;
      let size1 = player.bullets[i].size;

      for(let j= 0; j < enemies.length; j++) {
        let pos2 = enemies[j].pos;
        let size2 = enemies[j].size;

        if(boxCollides(pos1, size1, pos2, size2)) {
          if(enemies[j].health > 0) {
            enemies[j].health--;
            let explosion = new Explosion("images/sprites.png", [50, 50], [0, 0], [pos1[0] - 25, pos1[1]- 50], [0, 117], [39, 39], 39, 13);
            explosions.push(explosion);
            smallESound.play();

          } else {
            let explosion1 = new Explosion("images/sprites.png", [200, 200], [0, 0], [pos2[0]-50, pos2[1]-50], [0, 117], [39, 39], 39, 13);
            let explosion2 = new Explosion("images/sprites.png", [200, 200], [0, 0], [pos1[0]-100, pos1[1]-100], [0, 117], [39, 39], 39, 13);
            let explosion3 = new Explosion("images/sprites.png", [200, 200], [0, 0], [pos1[0] - 50, pos1[1]-50], [0, 117], [39, 39], 39, 13);
            explosions.push(explosion1);
            explosions.push(explosion2);
            explosions.push(explosion3);
            enemies.splice(j, 1);
            largeESound.play();
            j--;
          }
          player.bullets.splice(i, 1);
          i--;
        }
      }
    }
  }
 
  function checkEnemyBulletCollisions () {
    let bulletCollision = false;
    for (let i = 0; i < enemies.length; i++) {

      for (let j = 0; j < enemies[i].bullets.length; j++) {
        let pos1 = enemies[i].bullets[j].pos;
        let size1 = enemies[i].bullets[j].size;

        if (boxCollides(enemies[i].bullets[j].pos, enemies[i].bullets[j].size, player.pos, player.size)) {
          bulletCollision = true;
          let explosion = new Explosion("images/sprites.png", [100, 100], [0, 0], [pos1[0]-50, pos1[1]-20], [0, 117], [39, 39], 39, 13);
          explosions.push(explosion);
          playerESound.play();
          player.lives--;
          if(player.lives <= 0) {
            let explosion1 = new Explosion("images/sprites.png", [200, 200], [0, 0], [pos1[0]-50, pos1[1]-20], [0, 117], [39, 39], 39, 13);
            explosions.push(explosion1);
          }
          enemies[i].bullets.splice(j, 1);
          j--;
        }
      }
    }
    return bulletCollision;
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
    } else if (e.keyCode == 27) {
      gameIsRunning = !gameIsRunning;

      if(gameIsRunning) {
        requestAnimationFrame(main);
        themeSong.play();
      } else {
        themeSong.pause();
      }
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

  function renderExplosions() {
    explosions.forEach(explosion => {
      explosion.animateExplosion(ctx);  
    });

    for(let i = 0; i < explosions.length; i++) {
      if( explosions[i] && explosions[i].shiftFrames <= 0) {
        delete explosions[i];
        i--;
      }  
    }

    console.log(explosions);
  }

  function updateAllEntities() {
    player.render(ctx);
    enemies.forEach(enem => {
      enem.render(ctx);
      enem.updateBullets(canvas);
    });

    player.bullets.forEach(bullet => {
      bullet.render(ctx);
    });
    enemies.forEach(enemy => {
      enemy.bullets.forEach(bullet => {
        bullet.render(ctx);
      });

      } 
    );

    player.updateBullets(canvas);
    checkPlayerBulletCollisions();
    enemies.forEach(enemy => {
      if (Date.now() - enemy.lastTimeFired > 500) {
        enemy.shootBullet(player);
        enemy.lastTimeFired = Date.now();
      }
    });
    
    checkEnemyBulletCollisions(); 
    
    renderExplosions();
}

  
  const render = (modifier) => {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // ctx.fillStyle = background;
    
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "rgba(255, 255, 255, 0)";

    updateAllEntities();

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
    
    if(spacePressed && (Date.now() - lastFire > 500)) {
      player.shootBullet();
      lastFire = Date.now();
    }
    
  };

  const main = () => {
    
    const now = Date.now();
    const delta = now - then;
    // if (enemies.length === 0){
    //   alert("Winner!");
    //   enemies.forEach(enemy => {
    //     enemy.bullets = [];
    //   });
    //   loadEntities();
    // } else if (player.lives <= 0 ) {
    //   alert("game over. play again?");
    //   enemies.forEach((enemy) => {enemy.bullets = [];});
    //   loadEntities();
    // }
    render(delta /1000);
    then = now;
    if (gameIsRunning) {
      requestAnimationFrame(main);
    }
    // if (player.lives ===0) window.cancelAnimationFrame();
  };

  let then = Date.now();
  loadEntities();
  if(!gameover()) {
    main();
  }
  
});



  