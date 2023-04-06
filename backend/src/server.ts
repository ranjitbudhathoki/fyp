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
  socket.on('join-room', (roomId) => {
    console.log(`joined a room ${roomId}`);
    socket.join(roomId);
  });

  socket.on('leave-room', (chatId) => {
    socket.leave(chatId);
  });

  socket.on('new-message', (event) => {
    socket.to(event.data.events[1]).emit('push-new-message', event);
  });

  socket.on('typing', (data) => {
    console.log({ data });
    socket.to(data.chatId).emit('typing-status', data);
  });
});

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
