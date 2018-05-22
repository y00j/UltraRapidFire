import Sprite from './sprite';
import Entity from './entity';
import Bullet from './bullet';
import * as Util from './util';

class Enemy extends Entity {
  constructor(url, pos, size, speed) {
    super(url, pos, size, speed);
    this.bullets = [];
    this.shootBullet = this.shootBullet.bind(this);
    this.updateBullets = this.updateBullets.bind(this);
    this.health = 5;
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
    let bullet = new Bullet("images/sprites.png", [10, 10], 5, [vX, vY], this);
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

export default Enemy;