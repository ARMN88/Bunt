const fs = require('fs');
const path = require('path');

const characters = fs.readdirSync('./public/images/');
const data = {};

for (const character of characters) {
  const limbs = fs.readdirSync(`./public/images/${character}/`);
  data[character] = {
    bones: {},
    animations: {},
  };
  for (const limb of limbs) {
    data[character].bones[path.parse(limb).name] = {
      start: [0, 0],
      end: [100, 100],
    };
  }
}

fs.writeFileSync('./public/characters.json', JSON.stringify(data, null, 2));
