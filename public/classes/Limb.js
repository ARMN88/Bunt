import { ctx } from '../boneEditor.js';

export default class Limb {
  constructor(character, limb, start = [0, 0], end = [100, 100]) {
    this.image = new Image();
    this.image.src = `../images/${character}/${limb}.png`;

    this.start = start;
    this.end = end;
  }
  draw(size) {
    if (this.image.naturalWidth === 0) return;
    ctx.drawImage(
      this.image,
      0,
      0,
      size,
      size * (this.image.height / this.image.width)
    );

    ctx.fillStyle = 'limegreen';
    ctx.beginPath();
    ctx.arc(
      size * (this.start[0] / 100),
      size * (this.start[1] / 100) * (this.image.height / this.image.width),
      5,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = 'dodgerblue';
    ctx.beginPath();
    ctx.arc(
      size * (this.end[0] / 100),
      size * (this.end[1] / 100) * (this.image.height / this.image.width),
      5,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}
