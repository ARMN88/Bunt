const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));

const characterLimbsData = {
  characters: [],
  limbs: [],
};

const characters = fs.readdirSync('./public/images/');
for (const character of characters) {
  characterLimbsData.characters.push(character);
}
const limbs = fs.readdirSync(`./public/images/${characters[0]}`);
for (const limb of limbs) {
  characterLimbsData.limbs.push(path.parse(limb).name);
}

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected!`);
  socket.emit('characterLimbs', characterLimbsData);
});

httpServer.listen(3000, () => {
  console.log('Node server running...');
});
