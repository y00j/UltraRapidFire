import Sprite from './sprite';

class Explosion extends Sprite {
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


export default Explosion;


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