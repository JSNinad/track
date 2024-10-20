// // const express = require('express');
// // const http = require('http');
// // const socketIo = require('socket.io');
// // const cors = require('cors');

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketIo(server, {
// //   cors: {
// //     origin: 'https://vehiceltracking.vercel.app/', // allow your frontend to connect
// //     methods: ['GET', 'POST'],
// //     credentials: true
// //   }
// // });

// // app.use(cors({
// //   origin: 'https://vehiceltracking.vercel.app/', // allow your frontend
// //   credentials: true
// // }));

// // app.get('/', (req, res) => {
// //   res.send('Horn Notification Backend');
// // });

// // io.on('connection', (socket) => {
// //   console.log('User connected', socket.id);

// //   // Listen for the horn event
// //   socket.on('horn', () => {
// //     // Notify all clients except the sender
// //     socket.broadcast.emit('notifyHorn');
// //   });

// //   socket.on('disconnect', () => {
// //     console.log('User disconnected', socket.id);
// //   });
// // });

// // const PORT = process.env.PORT || 5000;
// // server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

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

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: ['https://vehiceltracking.vercel.app', 'http://localhost:3000'],
    methods: ['GET', 'POST'],
    credentials: true,
  },
});

app.use(cors({
  origin: ['https://vehiceltracking.vercel.app', 'http://localhost:3000'],
  credentials: true,
}));

app.get('/', (req, res) => {
  res.send('Horn Notification Backend');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Store user's location
  let userLocation = null;

  // Listen for location data
  socket.on('sendLocation', (location) => {
    userLocation = location;
    console.log('Location received:', location);
  });

  // Listen for the horn event
  socket.on('horn', () => {
    const hornUserLocation = userLocation;

    // Broadcast the horn event to all clients
    socket.broadcast.emit('hornRequested', hornUserLocation);
  });

  // Listen for incoming location data to check the distance
  socket.on('checkDistance', (location) => {
    const distance = calculateDistance(userLocation, location);

    if (distance <= 200) {
      socket.emit('notifyHorn'); // Notify the horn if within range
    } else {
      socket.emit('farNotify', { message: 'FAR notify' }); // Notify that it's far
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Function to calculate the distance between two coordinates
function calculateDistance(loc1, loc2) {
  const R = 6371e3; // meters
  const lat1 = loc1.latitude * Math.PI / 180; // φ in radians
  const lat2 = loc2.latitude * Math.PI / 180; // φ in radians
  const deltaLat = (loc2.latitude - loc1.latitude) * Math.PI / 180;
  const deltaLon = (loc2.longitude - loc1.longitude) * Math.PI / 180;

  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(lat1) * Math.cos(lat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // in meters
}

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
