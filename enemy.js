import Sprite from './sprite';

class Enemy extends Sprite {
  constructor(url, size, speed, pos, spritePos, spriteSize) {
    super(url, size, speed, pos, spritePos, spriteSize);
    this.bullets = [];
  }
}

export default Enemy;