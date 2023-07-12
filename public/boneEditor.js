import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

import Limb from './classes/Limb.js';
import Slider from './classes/Slider.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

let character = new Limb('HamzaA', 'Arm_Bottom');

const characterSelector = document.querySelector('#character');
const limbSelector = document.querySelector('#limb');

const startXSlider = new Slider('Start X', [0, 0, 100]);
const startYSlider = new Slider('Start Y', [0, 0, 100]);

const endXSlider = new Slider('End X', [0, 100, 100]);
const endYSlider = new Slider('End Y', [0, 100, 100]);

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  character.draw((canvas.width * 3) / 5);
}

Update();

startXSlider.onChange = (value) => (character.start.x = value / 100);

startYSlider.onChange = (value) => (character.start.y = value / 100);

endXSlider.onChange = (value) => (character.end.x = value / 100);

endYSlider.onChange = (value) => (character.end.y = value / 100);

characterSelector.onchange = function () {
  character = new Limb(this.value, limbSelector.value);
};

limbSelector.onchange = function () {
  character = new Limb(characterSelector.value, this.value);
};

// Socket Events //
socket.on('connect', () => console.log('Connected to server!'));

socket.on('disconnect', () => window.location.reload());

socket.on('characterLimbs', (data) => {
  for (const character of data.characters) {
    let characterOption = document.createElement('option');
    characterOption.appendChild(document.createTextNode(character));
    characterOption.setAttribute('value', character);
    characterSelector.appendChild(characterOption);
  }
  for (const limb of data.limbs) {
    let limbOption = document.createElement('option');
    limbOption.appendChild(document.createTextNode(limb.replaceAll('_', ' ')));
    limbOption.setAttribute('value', limb);
    limbSelector.appendChild(limbOption);
  }
});

export { ctx };
