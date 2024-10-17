import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Update with your deployed server URL

function App() {
  const [notification, setNotification] = useState(false);

  useEffect(() => {
    // Listen for horn notification
    socket.on('notifyHorn', () => {
      setNotification(true);
      setTimeout(() => setNotification(false), 3000); // Reset after 3 seconds
    });

    return () => socket.off('notifyHorn');
  }, []);

  const handleHornClick = () => {
    socket.emit('horn'); // Notify the server
  };

  return (
    <div className="App">
      <button onClick={handleHornClick}>Horn</button>
      {notification && <p>Horn clicked on another device!</p>}
    </div>
  );
}

export default App;
