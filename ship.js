import Entity from './entity';
import Bullet from './bullet';

class Ship extends Entity {
  constructor(url, pos, size, speed) {
    super(url, pos, size, speed);
    this.bullets = [];
    this.shootBullet = this.shootBullet.bind(this);
    this.updateBullets = this.updateBullets.bind(this);
  }

  shootBullet() {
    let bullet = new Bullet("images/sprites.png", [20, 20], 10, [1, 0], this);
    console.log(bullet);
    this.bullets.push(bullet);
  }

  updateBullets(canvas) {
    for(let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];

      bullet.pos[0] = bullet.pos[0] + bullet.speed;

      if(bullet.pos[0] > canvas.width || bullet.pos[1] > canvas.height ||
        bullet.pos[1] < 0) {
          this.bullets.splice(i, 1);
          i--;
      }
    }

  }

}

export default Ship;