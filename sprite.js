
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

export default Sprite;
