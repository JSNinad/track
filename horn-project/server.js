const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'http://localhost:3000', // allow your frontend to connect
    methods: ['GET', 'POST'],
    credentials: true
  }
});

app.use(cors({
  origin: 'http://localhost:3000', // allow your frontend
  credentials: true
}));

app.get('/', (req, res) => {
  res.send('Horn Notification Backend');
});

io.on('connection', (socket) => {
  console.log('User connected', socket.id);

  // Listen for the horn event
  socket.on('horn', () => {
    // Notify all clients except the sender
    socket.broadcast.emit('notifyHorn');
  });

  socket.on('disconnect', () => {
    console.log('User disconnected', socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));