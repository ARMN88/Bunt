const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const fs = require('fs');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log(`Socket ${socket.id} connected!`);
  socket.emit(
    'charactersData',
    JSON.parse(fs.readFileSync('./public/characters.json', 'utf-8'))
  );

  socket.on('characterUpdate', (data) => {
    const currentData = JSON.parse(
      fs.readFileSync('./public/characters.json', 'utf-8')
    );

    currentData[data.character].bones[data.limb].end = data.end.map((x) =>
      parseInt(x)
    );
    currentData[data.character].bones[data.limb].start = data.start.map((x) =>
      parseInt(x)
    );

    fs.writeFileSync(
      './public/characters.json',
      JSON.stringify(currentData, null, 2)
    );
  });
});

httpServer.listen(3000, () => {
  console.log('Node server running...');
});
