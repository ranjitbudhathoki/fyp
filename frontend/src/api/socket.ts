import { io } from 'socket.io-client';

// const socket = io('http://localhost:8000');
const socket = io(process.env.REACT_APP_SERVER_URL);

export default socket;
