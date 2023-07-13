import { io } from 'https://cdn.socket.io/4.3.2/socket.io.esm.min.js';
const socket = io();

import Limb from './classes/Limb.js';
import Slider from './classes/Slider.js';

const canvas = document.querySelector('canvas');
canvas.width = innerWidth;
canvas.height = innerHeight;

const ctx = canvas.getContext('2d');

let size = (canvas.width * 2) / 3;

let characters;
let character = new Limb('HamzaA', 'Arm_Bottom');

const characterSelector = document.querySelector('#character');
const limbSelector = document.querySelector('#limb');

const sizeSlider = new Slider('Size', [0, size, 5000]);

const startXSlider = new Slider('Start X', [0, 0, 100]);
const startYSlider = new Slider('Start Y', [0, 0, 100]);

const endXSlider = new Slider('End X', [0, 100, 100]);
const endYSlider = new Slider('End Y', [0, 100, 100]);

function Update() {
  requestAnimationFrame(Update);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  character.draw(size);
}

Update();

startXSlider.onChange = (value) => (character.start[0] = value);

startYSlider.onChange = (value) => (character.start[1] = value);

endXSlider.onChange = (value) => (character.end[0] = value);

endYSlider.onChange = (value) => (character.end[1] = value);

sizeSlider.onChange = (value) => (size = value);

characterSelector.onchange = function () {
  character = new Limb(this.value, limbSelector.value);
  character.start = characters[this.value].bones[limbSelector.value].start;
  character.end = characters[this.value].bones[limbSelector.value].end;
};

limbSelector.onchange = function () {
  character = new Limb(characterSelector.value, this.value);
  character.start = characters[characterSelector.value].bones[this.value].start;
  character.end = characters[characterSelector.value].bones[this.value].end;
};

document.onkeydown = (e) => {
  if (e.code !== 'KeyS') return;
  socket.emit('characterUpdate', {
    character: characterSelector.value,
    limb: limbSelector.value,
    end: character.end,
    start: character.start,
  });
};

// Socket Events //
socket.on('connect', () => console.log('Connected to server!'));

socket.on('disconnect', () => window.location.reload());

socket.on('charactersData', (data) => {
  for (const character in data) {
    let characterOption = document.createElement('option');
    characterOption.appendChild(document.createTextNode(character));
    characterOption.setAttribute('value', character);
    characterSelector.appendChild(characterOption);
  }
  for (const limb in data[Object.keys(data)[0]].bones) {
    let limbOption = document.createElement('option');
    limbOption.appendChild(document.createTextNode(limb.replaceAll('_', ' ')));
    limbOption.setAttribute('value', limb);
    limbSelector.appendChild(limbOption);
  }
  characters = data;

  character.start =
    characters[characterSelector.value].bones[limbSelector.value].start;
  character.end =
    characters[characterSelector.value].bones[limbSelector.value].end;
});

export { ctx };
