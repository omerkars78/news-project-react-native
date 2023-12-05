// src/services/socketService.ts
import io from 'socket.io-client';

const SOCKET_URL = 'http://localhost:3000/api/activities/activity'; 
const socket = io(SOCKET_URL);

const connectSocket = () => {
  socket.connect();
};

const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};

export { connectSocket, disconnectSocket, socket };
