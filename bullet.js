import Entity from './entity';

class Bullet {
  constructor(url, size, speed, startVector, ownerShip) {
    this.image = new Image(size[0], size[1]);
    this.image.src = url;
    this.size = size;
    this.speed = speed;
    this.startVector = startVector;
    this.render = this.render.bind(this);
    this.pos = [ownerShip.pos[0] + 50, ownerShip.pos[1] + 46];
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