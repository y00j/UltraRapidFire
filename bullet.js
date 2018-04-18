import Sprite from './sprite';

class Bullet extends Sprite{
  constructor(url, size, speed, vector, ownerShip) { 
    super(url, size, speed, [ownerShip.pos[0] + 25, ownerShip.pos[1] + 46]);
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

export default Bullet;