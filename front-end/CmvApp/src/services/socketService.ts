// src/services/socketService.ts
import io from 'socket.io-client';

const SOCKET_URL = 'http:///192.168.1.17:3000/api/activities/activities/:type'; 
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
