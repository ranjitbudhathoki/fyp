import http from 'http';
import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import app from './app';
import { Server } from 'socket.io';

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: '*',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`Connected on ${socket.id}`);
  socket.on('send-message', (payload) => {
    console.log(payload);
    socket.broadcast.emit('receive-message', payload);
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
