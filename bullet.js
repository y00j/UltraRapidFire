import Entity from './entity';

class Bullet {
  constructor(url, size, speed, startVector) {
    this.image = new Image(size[0], size[1]);
    this.image.src = url;
    // this.pos = pos;
    this.size = size;
    this.speed = speed;
    this.startVector = startVector;

    this.render = this.render.bind(this);
  }

  render(ctx, ship) {
    let that = this;
    ctx.drawImage(
      that.image,
      0, 39,
      18, 8,
      ship.pos[0], 
      ship.pos[1], 
      that.size[0], 
      that.size[1]
    );
  }
}

export default Bullet;