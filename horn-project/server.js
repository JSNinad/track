// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'https://vehiceltracking.vercel.app', // Allow your frontend to connect
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// // Middleware to enable CORS for your frontend
// app.use(cors({
//   origin: 'https://vehiceltracking.vercel.app', // Allow your frontend
//   credentials: true,
// }));

// // Simple route for testing the backend
// app.get('/', (req, res) => {
//   res.send('Horn Notification Backend');
// });

// // Handle socket connections
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Listen for the horn event
//   socket.on('horn', () => {
//     // Notify all clients except the sender
//     socket.broadcast.emit('notifyHorn');
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Allow requests from localhost:3000
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// // Middleware to enable CORS for frontend running on localhost:3000
// app.use(cors({
//   origin: 'http://localhost:3000', // Frontend running on localhost
//   credentials: true,
// }));

// // Simple route for testing the backend
// app.get('/', (req, res) => {
//   res.send('Horn Notification Backend');
// });

// // Handle socket connections
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Listen for the horn event
//   socket.on('horn', () => {
//     // Notify all clients except the sender
//     socket.broadcast.emit('notifyHorn');
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: 'http://localhost:3000', // Allow requests from localhost:3000
//     methods: ['GET', 'POST'],
//     credentials: true,
//   },
// });

// // Middleware to enable CORS for frontend running on localhost:3000
// app.use(cors({
//   origin: 'http://localhost:3000', // Frontend running on localhost
//   credentials: true,
// }));

// // Simple route for testing the backend
// app.get('/', (req, res) => {
//   res.send('Horn Notification Backend');
// });

// // Handle socket connections
// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Listen for the horn event with a message
//   socket.on('horn', (message) => {
//     // Notify all clients except the sender, along with the message
//     socket.broadcast.emit('notifyHorn', message);
//   });

//   // Handle disconnection
//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });

// // Start the server
// const PORT = process.env.PORT || 5000;
// server.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: 'https://vehiceltracking.vercel.app', // Frontend URL
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

// Middleware to enable CORS for your frontend
app.use(cors({
  origin: 'https://vehiceltracking.vercel.app', // Frontend URL
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
