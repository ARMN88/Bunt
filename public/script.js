import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

import Limb from './classes/Limb.js';
import Slider from './classes/Slider.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

const wael = new Limb('Wael Arm Bottom');
const startXSlider = new Slider('Start X');
const startYSlider = new Slider('Start Y');

const endXSlider = new Slider('End X');
const endYSlider = new Slider('End Y');

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  wael.draw((canvas.width * 3) / 4);
}

Update();

startXSlider.onChange = (value) => {
  wael.start.x = value / 100;
};

startYSlider.onChange = (value) => {
  wael.start.y = value / 100;
};

endXSlider.onChange = (value) => {
  wael.end.x = value / 100;
};

endYSlider.onChange = (value) => {
  wael.end.y = value / 100;
};

socket.on('connect', () => {
  console.log('Connected to server!');
});

socket.on('disconnect', () => {
  window.location.reload();
});

export { ctx };
