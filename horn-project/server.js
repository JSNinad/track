const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://vehiceltracking.vercel.app', // Allow your frontend to connect
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware to enable CORS for your frontend
app.use(cors({
  origin: 'https://vehiceltracking.vercel.app', // Allow your frontend
  credentials: true,
}));

// Simple route for testing the backend
app.get('/', (req, res) => {
  res.send('Horn Notification Backend');
});

// Handle socket connections
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Listen for the horn event
  socket.on('horn', () => {
    // Notify all clients except the sender
    socket.broadcast.emit('notifyHorn');
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
