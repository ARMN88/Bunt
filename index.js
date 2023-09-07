const socket = require('socket.io');
const express = require('express');
const app = express();

app.use(express.static('public'));
app.get('/socket.io', (req, res) => {
  res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.esm.min.js');
});

const server = app.listen(3000, () => {
  console.log('Node server running...');
});

const io = socket(server);
io.on('connection', socket => {
  console.log(`Socket ${socket.id} connected!`);
});