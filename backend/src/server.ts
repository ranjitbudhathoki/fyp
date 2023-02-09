import http from 'http';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import app from './app';
import socket, { Server } from 'socket.io';

const server = http.createServer(app);

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

io.on('connection', (socket) => {
  console.log('We are connected');

  socket.on('chat', (chat) => {
    io.emit('chat', chat);
  });

  socket.on('disconnect', () => {
    console.log('disconnected');
  });
});
