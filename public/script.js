import { io } from '/socket.io';
const socket = io();
eruda.init();

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

window.onload = Update;