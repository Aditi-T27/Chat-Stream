//this is a demo code, does not refer to the current working applications

import io from "socket.io-client";
import "./App.css";
import { useState, useEffect } from "react";

const socket = io.connect("http://localhost:3001");
function App() {
  const [userId, setUserId] = useState(""); // Unique User ID fetch auth id from db
  const [receiverId, setReceiverId] = useState(""); // ID of the person to chat with , from user db on basis of auth id
  const [message, setMessage] = useState(""); // Message input
  const [chat, setChat] = useState([]); // Store chat messages

  // Register user on the server
  const registerUser = () => {
    if (userId) {
      socket.emit("register", userId);
    }
  };

  // Send private message
  const sendMessage = () => {
    if (receiverId && message) {
      socket.emit("send_private_message", { senderId: userId, receiverId, message });
      setChat([...chat, { sender: "You", text: message }]);
      setMessage("");
    }
  };

  // Receive messages
  useEffect(() => {
    socket.on("receive_private_message", (data) => {
      setChat([...chat, { sender: data.senderId, text: data.message }]);
    });

    return () => {
      socket.off("receive_private_message");
    };
  }, [chat]);

  return (
    <div className="app">

      <h2>Private Chat App</h2>

      {/* Register User */}
      <input type="text" placeholder="Enter Your User ID" onChange={(e) => setUserId(e.target.value)} />
      <button onClick={registerUser}>Register</button>

      {/* Enter Receiver ID */}
      <input type="text" placeholder="Receiver's User ID" onChange={(e) => setReceiverId(e.target.value)} />

      {/* Chat Input */}
      <input type="text" placeholder="Message..." value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>

      {/* Chat Messages */}
      <div className="chat-box">
        {chat.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
