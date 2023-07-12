import { ctx } from '../boneEditor.js';

export default class Limb {
  constructor(character, limb, start = { x: 0, y: 0 }, end = { x: 1, y: 1 }) {
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
      size * this.start.x,
      size * this.start.y * (this.image.height / this.image.width),
      5,
      0,
      2 * Math.PI
    );
    ctx.fill();

    ctx.fillStyle = 'dodgerblue';
    ctx.beginPath();
    ctx.arc(
      size * this.end.x,
      size * this.end.y * (this.image.height / this.image.width),
      5,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}
