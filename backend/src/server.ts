import http from 'http';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import app from './app';
import socket, { Server } from 'socket.io';

const server = http.createServer(app);

const io = new Server(server);

io.on('connection', (socket) => {
  console.log('We are connected');
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
