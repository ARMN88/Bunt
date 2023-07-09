import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

function Update() {
  requestAnimationFrame(Update);
}

Update();

socket.on('connect', () => {
  console.log('Connected to server!');
});
