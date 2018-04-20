/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Entity {
  constructor(url, pos, size, speed) {
    this.image = new Image(size[0], size[1]);
    this.image.src = url;
    this.pos = pos;
    this.size = size;
    this.speed = speed;

    this.render = this.render.bind(this);
  }

  render(ctx) {
    ctx.drawImage(
      this.image, 
      this.pos[0], 
      this.pos[1],
      this.size[0],
      this.size[1]
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Entity);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(2);


class Bullet extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */]{
  constructor(url, size, speed, vector, ownerShip) { 
    super(url, size, speed, [ownerShip.pos[0] + ownerShip.size[0]/3, ownerShip.pos[1] + 20]);
    this.speed = speed;
    this.vector = vector;
  }

  render(ctx) {
    let that = this;
    ctx.drawImage(
      that.image,
      0, 39,
      18, 8,
      that.pos[0], 
      that.pos[1], 
      that.size[0], 
      that.size[1]
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Bullet);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

class Sprite {
  constructor(url, size, speed, pos, spritePos, spriteSize) {
    this.image = new Image(size[0], size[1]);
    this.image.src = url;
    this.size = size;
    this.render = this.render.bind(this);
    this.pos = pos;
    this.speed = speed;
    this.spritePos = spritePos;
    this.spriteSize = spriteSize;
  }

  render(ctx) {
    let that = this;
    ctx.drawImage(
      that.image,
      that.spritePos[0],
      that.spritePos[1],
      that.spriteSize[0],
      that.spriteSize[1],
      that.pos[0],
      that.pos[1],
      that.size[0],
      that.size[1]
    );
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Sprite);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export collides */
/* unused harmony export boxCollides */


function collides(x, y, r, b, x2, y2, r2, b2) {
  return !(r <= x2 || x > r2 || b <= y2 || y > b2);
}

function boxCollides(pos, size, pos2, size2) {
  return collides(
    pos[0],
    pos[1],
    pos[0] + size[0],
    pos[1] + size[1],
    pos2[0],
    pos2[1],
    pos2[0] + size2[0],
    pos2[1] + size2[1]
  );
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ship__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__enemy__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__explosion__ = __webpack_require__(7);





 
document.addEventListener('DOMContentLoaded', () => {

  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");

  var smallESound = document.getElementById("small-explosion");
  var largeESound = document.getElementById("large-explosion");
  var playerESound = document.getElementById("player-explosion");

  largeESound.volume = 0.15;
  smallESound.volume = 0.5;
  playerESound.volume = 0.15;

  var themeSong = document.getElementById("theme");
  themeSong.play();

  // var music1 = new sound("sounds/Sunstrider.mp3");

  // music1.play();
  // var largeExplosion = new sound("sounds/explosion_small.mp3");

  // let backgroundImage = new Image(canvas.height, canvas.width);
  // backgroundImage.src = "images/mother1.png";

  // const background = ctx.createPattern(backgroundImage, "repeat");
  // console.log(typeof backgroundImage);

  // console.log(background);

  let enemies = [];
  let explosions = [];

  // let explosion = new Explosion(
  //   'images/sprites.png', 
  //   [100, 100],
  //   [0,0],
  //   [100, 100], 
  //   [0, 117],
  //   [39, 39], 
  //   39, 
  //   13 
  // );

  



  // let enemy = new Enemy(
  //   "images/battle_cruiser.png", 
  //   [200, 170], 
  //   1, 
  //   [600, 10],
  //   [90, 130], 
  //   [88, 70]
  // );
  


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
    //x -> bullet.pos[0]
    //y --> bullet.pos[1]
    //r  10
    //b  10
    //r2 50 
    //b2 40
    //x2 -> player.pos[0]
    //y2 -> player.pos[1]


    // return !(r <= x2 || x > r2 || b <= y2 || y > b2);
    return (x > (x2 - r) && x < (x2 + r2 + r)) && (y > (y2 - b) && y < (y2 + b2 + b));
  }

  function boxCollides(pos, size, pos2, size2) {
    return collides(pos[0], pos[1], size[0], size[1], pos2[0], pos2[1], size2[0], size2[1]);
    // return collides(pos[0], pos[1], pos[0] + size[0], pos[1] + size[1], pos2[0], pos2[1], pos2[0] + size2[0], pos2[1] + size2[1]);

  }

  let player;
  let enemy1;
  let enemy2;

  function start() {
    player = new __WEBPACK_IMPORTED_MODULE_2__ship__["a" /* default */]("images/main_player.png", [canvas.width / 2 - 25, 500], [50, 40], 500);
    enemy1 = new __WEBPACK_IMPORTED_MODULE_3__enemy__["a" /* default */]("images/mother1.png", [canvas.width / 4 - 33, 50], [75, 100], 100);
    enemy2 = new __WEBPACK_IMPORTED_MODULE_3__enemy__["a" /* default */]("images/mother1.png", [canvas.width * 3 / 4 - 33, 50], [75, 100], 100);
    enemies.push(enemy1);
    enemies.push(enemy2);
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
            let explosion = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */]("images/sprites.png", [50, 50], [0, 0], [pos1[0] - 25, pos1[1]- 50], [0, 117], [39, 39], 39, 13);
            explosions.push(explosion);
            smallESound.play();

          } else {
            let explosion1 = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */]("images/sprites.png", [200, 200], [0, 0], [pos2[0]-50, pos2[1]-50], [0, 117], [39, 39], 39, 13);
            let explosion2 = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */]("images/sprites.png", [200, 200], [0, 0], [pos1[0]-100, pos1[1]-100], [0, 117], [39, 39], 39, 13);
            let explosion3 = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */]("images/sprites.png", [200, 200], [0, 0], [pos1[0] - 50, pos1[1]-50], [0, 117], [39, 39], 39, 13);
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
          let explosion = new __WEBPACK_IMPORTED_MODULE_4__explosion__["a" /* default */]("images/sprites.png", [100, 100], [0, 0], [pos1[0]-50, pos1[1]-20], [0, 117], [39, 39], 39, 13);
          explosions.push(explosion);
          playerESound.play();
          player.lives--;
          console.log(player.lives);
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
    if (checkEnemyBulletCollisions()) {

      console.log("you died");
    } 
    
    explosions.forEach(explosion => {
      explosion.animateExplosion(ctx);  
    });
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
    if (enemies.length === 0){
      alert("Winner!");
      enemies.forEach(enemy => {
        enemy.bullets = [];
      });
      start();
    } else if (player.lives <= 0 ) {
      alert("game over. play again?");
      enemies.forEach((enemy) => {enemy.bullets = [];});
      start();
    }
    render(delta /1000);
    then = now;
    requestAnimationFrame(main);
    // if (player.lives ===0) window.cancelAnimationFrame();
  };

  let then = Date.now();
  start();
  if(!gameover()) {
    main();
  }
  
});



  

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bullet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util__ = __webpack_require__(3);




class Ship extends __WEBPACK_IMPORTED_MODULE_0__entity__["a" /* default */] {
  constructor(url, pos, size, speed) {
    super(url, pos, size, speed);
    this.bullets = [];
    this.shootBullet = this.shootBullet.bind(this);
    this.updateBullets = this.updateBullets.bind(this);
    this.lives = 3;
  }

  shootBullet() {
    let bullet = new __WEBPACK_IMPORTED_MODULE_1__bullet__["a" /* default */]("images/sprites.png", [10, 10], 10, [1, 0], this);
    console.log(bullet);
    this.bullets.push(bullet);
  }

  updateBullets(canvas) {
    for(let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];

      bullet.pos[1] = bullet.pos[1] - bullet.speed;

      if(bullet.pos[0] > canvas.width || bullet.pos[1] > canvas.height ||
        bullet.pos[1] < 0) {
          this.bullets.splice(i, 1);
          i--;
      }
    }
  }



}

/* harmony default export */ __webpack_exports__["a"] = (Ship);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__entity__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bullet__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util__ = __webpack_require__(3);





class Enemy extends __WEBPACK_IMPORTED_MODULE_1__entity__["a" /* default */] {
  constructor(url, pos, size, speed) {
    super(url, pos, size, speed);
    this.bullets = [];
    this.shootBullet = this.shootBullet.bind(this);
    this.updateBullets = this.updateBullets.bind(this);
    this.health = 10;
    this.lastTimeFired = Date.now();
  }

  // constructor(url, size, speed, pos, spritePos, spriteSize) {
  //   super(url, size, speed, pos, spritePos, spriteSize);
  //   this.bullets = [];
  //   this.move = this.move.bind(this);
  //   this.initial = pos[0];
  // }

  // move() {
  //   this.pos[0] = (this.initial + Math.cos((this.pos[1])/ 15) * 100);
  //   this.pos[1] += this.speed; 
  // }

  shootBullet(player) {
    let vY = (player.pos[1] - this.pos[1]) / Math.sqrt(Math.pow(player.pos[1] - this.pos[1], 2) + Math.pow(player.pos[0] - this.pos[0], 2));
    let vX = (player.pos[0] - this.pos[0]) / Math.sqrt(Math.pow(player.pos[1] - this.pos[1], 2) + Math.pow(player.pos[0] - this.pos[0], 2));
    // debugger;
    let bullet = new __WEBPACK_IMPORTED_MODULE_2__bullet__["a" /* default */]("images/sprites.png", [10, 10], 5, [vX, vY], this);
    this.bullets.push(bullet);
  }

  updateBullets(canvas) {
    for (let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];

      bullet.pos[0] = bullet.pos[0] + bullet.vector[0] * bullet.speed;
      bullet.pos[1] = bullet.pos[1] + bullet.vector[1] * bullet.speed;

      if (
        bullet.pos[0] < 0 || bullet.pos[0] > canvas.width ||
        bullet.pos[1] > canvas.height ||
        bullet.pos[1] < 0
      ) {
        this.bullets.splice(i, 1);
        i--;
      }
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Enemy);

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__sprite__ = __webpack_require__(2);


class Explosion extends __WEBPACK_IMPORTED_MODULE_0__sprite__["a" /* default */] {
  constructor(url, size, speed, pos, spritePos, spriteSize, shift, shiftFrames) {
    super(url, size, speed, pos, spritePos, spriteSize);
    this.shift = shift;
    this.shiftFrames = shiftFrames;
    // this.animateExplosion = this.animateExplosion.bind(this);
  }

  animateExplosion(ctx) {
    let numFrames = 0;
    const animate = () => {
      numFrames++;
      this.render(ctx);

      if (numFrames === 5) {
        this.spritePos[0] += this.shift;
        numFrames = 0;
        this.shiftFrames--;
      }
      if (this.shiftFrames <= 0) {
        return;
      }
      requestAnimationFrame(animate);
    };
    animate();
  }
}


/* harmony default export */ __webpack_exports__["a"] = (Explosion);


// drawArrow() {
//     // this.directionImage.addEventListener("load", (e) => animate());
//     let numFrames = 0;
//     // console.dir(`initial call: ${this.direction}`);
//     const animate = () => {
//       // console.dir(`start animate: ${this.direction}`);
//       numFrames ++;
//       // ctx.clearRect(0, 0, this.width, this.height);
//       ctx.drawImage(
//         this.directionImage,
//         this.shift,
//         0,
//         this.width,
//         this.height,
//         this.x,
//         this.y,
//         this.width,
//         this.height
//       );
//       // console.dir(`after draw: ${this.direction}`);
//       this.y += this.dy;
//       // console.dir(`after this.y: ${this.direction}`);
//       if (numFrames === 15) {
//         this.shift += this.width;
//         numFrames = 0;
//         this.shift = this.shift === 1200 ? 0 : this.shift;
//       }
//       // console.dir(`before requestAnimationFrame: ${this.direction}`);
//       requestAnimationFrame(animate);
//       // setTimeout(animate, 33);
//     };
//     animate();
//   }

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map