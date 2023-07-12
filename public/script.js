import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

import Limb from './classes/Limb.js';
import Slider from './classes/Slider.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

Update();

socket.on('connect', () => {
  console.log('Connected to yes!');
});

socket.on('disconnect', () => {
  window.location.reload();
});

export { ctx };
