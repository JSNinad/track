// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('https://track-1-y9sd.onrender.com'); // Update with your deployed server URL

// function App() {
//   const [notification, setNotification] = useState(false);

//   useEffect(() => {
//     // Listen for horn notification
//     socket.on('notifyHorn', () => {
//       setNotification(true);
//       setTimeout(() => setNotification(false), 3000); // Reset after 3 seconds
//     });

//     return () => socket.off('notifyHorn');
//   }, []);

//   const handleHornClick = () => {
//     socket.emit('horn'); // Notify the server
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Horn Notification App</h1>
//       <button onClick={handleHornClick} style={styles.button}>Horn</button>
//       {notification && <p style={styles.notification}>Horn clicked on another device!</p>}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f5d547',
//     color: '#7e8287',
//     fontFamily: 'Arial, sans-serif',
//   },
//   title: {
//     marginBottom: '20px',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     color: '#fff',
//     backgroundColor: '#7e8287',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   buttonHover: {
//     backgroundColor: '#5a5d60',
//   },
//   notification: {
//     marginTop: '20px',
//     fontSize: '18px',
//     color: 'red',
//   },
// };

// export default App;
// ----------------
// import React, { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('https://track-1-y9sd.onrender.com'); // Update with your deployed server URL

// function App() {
//   const [notification, setNotification] = useState(false);
//   const hornSound = new Audio('/beep-sound.mp3'); // Path to your horn sound

//   useEffect(() => {
//     // Listen for horn notification from other devices
//     socket.on('notifyHorn', () => {
//       setNotification(true);
//       playHornSound(); // Play sound on receiving notification from another device
//       setTimeout(() => setNotification(false), 3000); // Reset after 3 seconds
//     });

//     return () => socket.off('notifyHorn');
//   }, []);

//   const handleHornClick = () => {
//     socket.emit('horn'); // Notify the server to trigger the horn event for other devices
//   };

//   const playHornSound = () => {
//     hornSound.play(); // Play the horn sound
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Horn Notification App</h1>
//       <button onClick={handleHornClick} style={styles.button}>Horn</button>
//       {notification && <p style={styles.notification}>Horn clicked on another device!</p>}
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f5d547',
//     color: '#7e8287',
//     fontFamily: 'Arial, sans-serif',
//   },
//   title: {
//     marginBottom: '20px',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     color: '#fff',
//     backgroundColor: '#7e8287',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   notification: {
//     marginTop: '20px',
//     fontSize: '18px',
//     color: 'red',
//   },
// };

// export default App;

// ------------------

// import React, { useEffect, useState, useRef } from 'react';
// import { io } from 'socket.io-client';

// // Connect to local server
// const socket = io('http://localhost:5000'); // Localhost server URL

// function App() {
//   const [notification, setNotification] = useState(false);
//   const [receivedMessage, setReceivedMessage] = useState(''); // To store the received message
//   const hornSoundRef = useRef(null); // Using useRef to store the horn sound
//   const [audioAllowed, setAudioAllowed] = useState(false); // Track if audio interaction is allowed

//   useEffect(() => {
//     // Listen for horn notification and message from other devices
//     socket.on('notifyHorn', (message) => {
//       setNotification(true);
//       setReceivedMessage(message); // Set the received message

//       if (audioAllowed) {
//         playHornSound(); // Play sound on receiving notification from another device if user has interacted
//       }

//       setTimeout(() => {
//         setNotification(false);
//         setReceivedMessage(''); // Clear the message after 3 seconds
//       }, 3000);
//     });

//     return () => socket.off('notifyHorn');
//   }, [audioAllowed]);

//   const handleHornClick = () => {
//     const customMessage = prompt('Enter your message:'); // Prompt user to input a message
//     socket.emit('horn', customMessage || 'Horn triggered!'); // Emit the message or default message

//     // On first interaction, allow audio playback
//     if (!audioAllowed) {
//       setAudioAllowed(true);
//       hornSoundRef.current.play(); // Play once to allow audio in the future
//       hornSoundRef.current.pause(); // Immediately pause it after playing
//     }
//   };

//   const playHornSound = () => {
//     hornSoundRef.current.play(); // Play the horn sound
//   };

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Horn Notification App</h1>
//       <button onClick={handleHornClick} style={styles.button}>Horn</button>
//       {notification && (
//         <p style={styles.notification}>
//           Horn clicked on another device! Message: {receivedMessage}
//         </p>
//       )}
//       {/* Hidden audio element */}
//       <audio ref={hornSoundRef} src='/beep-sound.mp3' preload='auto' />
//     </div>
//   );
// }

// const styles = {
//   container: {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: '100vh',
//     backgroundColor: '#f5d547',
//     color: '#7e8287',
//     fontFamily: 'Arial, sans-serif',
//   },
//   title: {
//     marginBottom: '20px',
//   },
//   button: {
//     padding: '10px 20px',
//     fontSize: '16px',
//     color: '#fff',
//     backgroundColor: '#7e8287',
//     border: 'none',
//     borderRadius: '5px',
//     cursor: 'pointer',
//     transition: 'background-color 0.3s',
//   },
//   notification: {
//     marginTop: '20px',
//     fontSize: '18px',
//     color: 'red',
//   },
// };

// export default App;
// ---------
// App.js
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Connect to the deployed server URL
const socket = io('https://track-1-y9sd.onrender.com'); // Backend URL

function App() {
  const [notification, setNotification] = useState(false);
  const hornSound = new Audio('/beep-sound.mp3'); // Path to your horn sound

  useEffect(() => {
    // Listen for horn notification from other devices
    socket.on('notifyHorn', () => {
      setNotification(true);
      playHornSound(); // Play sound on receiving notification from another device
      setTimeout(() => setNotification(false), 3000); // Reset after 3 seconds
    });

    return () => {
      socket.off('notifyHorn'); // Cleanup listener on component unmount
    };
  }, []);

  const handleHornClick = () => {
    socket.emit('horn'); // Notify the server to trigger the horn event for other devices
  };

  const playHornSound = () => {
    hornSound.play().catch((error) => {
      console.log('Sound play failed:', error);
    });
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Horn Notification App</h1>
      <button onClick={handleHornClick} style={styles.button}>Horn</button>
      {notification && <p style={styles.notification}>Horn clicked on another device!</p>}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5d547',
    color: '#7e8287',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    marginBottom: '20px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#7e8287',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  notification: {
    marginTop: '20px',
    fontSize: '18px',
    color: 'red',
  },
};

export default App;
