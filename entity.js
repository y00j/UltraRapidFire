class Entity {
  constructor(url, pos, size, speed, startDir) {
    this.image = new Image(size[0], size[1]);
    this.image.src = url;
    this.pos = pos;
    this.size = size;
    this.speed = speed;
    this.startDir = startDir;

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

export default Entity;
