// server/index.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
app.use(cors());

const server = http.createServer(app);

// Configure Socket.io with CORS to allow client connection
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // We will run React here
    methods: ["GET", "POST"],
  },
});

// Simple in-memory storage for message history
let messageHistory = [];

io.on('connection', (socket) => {
  console.log(`User Connected: ${socket.id}`);

  // 1. Send existing history to the NEW user only
  socket.emit('load_history', messageHistory);

  // 2. Listen for new messages
  socket.on('send_message', (data) => {
    const messageData = {
      id: Date.now(),
      text: data.text,
      author: data.author,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Save to history
    messageHistory.push(messageData);

    // Broadcast to EVERYONE (including sender)
    io.emit('receive_message', messageData);
  });

  socket.on('disconnect', () => {
    console.log('User Disconnected', socket.id);
  });
});

server.listen(3001, () => {
  console.log('SERVER RUNNING ON PORT 3001');
});