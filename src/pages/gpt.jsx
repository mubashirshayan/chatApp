// // ChatComponent.js
// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io('http://localhost:3001'); // Replace with your server URL

// const ChatComponent = ({ userId }) => {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         // Listen for incoming private messages
//         socket.on('private message', ({ senderId, message }) => {
//             setMessages((prevMessages) => [...prevMessages, { senderId, text: message }]);
//         });

//         // Clean up socket connection on component unmount
//         return () => {
//             socket.disconnect();
//         };
//     }, []);

//     const sendPrivateMessage = (targetUserId) => {
//         if (message.trim() !== '') {
//             // Emit the private message to the server
//             socket.emit('private message', { targetUserId, message });

//             // Clear the input field
//             setMessage('');
//         }
//     };

//     return (
//         <div>
//             <div>
//                 <ul>
//                     {messages.map((msg, index) => (
//                         <li key={index}>{`[${msg.senderId}]: ${msg.text}`}</li>
//                     ))}
//                 </ul>
//             </div>
//             <div>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                 />
//                 <button onClick={() => sendPrivateMessage('targetUserId')}>Send Private Message</button>
//             </div>
//         </div>
//     );
// };

// export default ChatComponent;

// server.js
// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');
// const mongoose = require('mongoose');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// // MongoDB setup (make sure to replace 'your_database_url' with your actual MongoDB connection string)
// mongoose.connect('your_database_url', { useNewUrlParser: true, useUnifiedTopology: true });

// // Socket.IO setup
// io.on('connection', (socket) => {
//     console.log(`User connected with ID: ${socket.id}`);

//     // Handle private chat messages
//     socket.on('private message', ({ targetUserId, message }) => {
//         const targetSocket = io.sockets.sockets.get(targetUserId);
//         if (targetSocket) {
//             // Send the private message to the target user
//             targetSocket.emit('private message', { senderId: socket.id, message });
//         }
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log(`User with ID ${socket.id} disconnected`);
//     });
// });

// // Start the server
// const PORT = process.env.PORT || 3001;
// server.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
//Make sure to replace 'targetUserId' with the actual user ID you want to send a private message to. You may integrate user authentication to dynamically handle user IDs based on logged-in users in a real-world scenario.