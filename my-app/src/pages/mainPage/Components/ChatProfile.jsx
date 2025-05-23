// import React, { useState, useEffect, useCallback } from 'react';
// import './ChatProfile.css'; // Import CSS file
// import io from "socket.io-client";
 


// const socket = io.connect("http://localhost:3001");

// const ChatProfile = ({ userId, receiverId }) => {
//   const [messages, setMessages] = useState([]);

//   const [chat, setChat] = useState([]); // Store chat messages
//   const [text, setText] = useState(); // Store chat messages
//   const[chatId,setChatId]=useState("");

//   const registerUser = useCallback(() => {
//     if (userId) {
//       socket.emit("register", userId);
//     }
//   },userId);

 

//       const fetchMessages = useCallback(async () => {
//         try {
//           const response = await fetch(
//             `http://localhost:3001/api/homepage/chatprofile?userId=${userId}&receiverId=${receiverId}`
//           );
//           const data = await response.json();
//           if (response.ok) {
//             console.log(data);
//             setMessages(data);
//             setChatId(data[0].chat_id);
//           } else {
//             console.error("Error fetching messages:", data.error);
//           }
//         } catch (error) {
//           console.error("Error fetching messages:", error);
//         }
//       },[userId, receiverId]);

//     useEffect(()=>{
//       fetchMessages()
   
//   }, [userId, receiverId]);

//   useEffect(() => {
//     console.log("Checking socket connection:", socket.connected);
  
//     const handleMessage = (data) => {
//       console.log("Received message:", data.text);
     
//       setChat((prevChat) => [...prevChat, {text:data.text,sender:data.userId}]);
//     };
  
//     socket.on("connect", () => {
//       console.log("Socket connected with ID:", socket.id);
//     });
  
//     socket.on("receive_private_message", handleMessage);
  
//     return () => {
//       socket.off("receive_private_message", handleMessage); 
//     };
//   }, []);
  
  
  
// const sendMessages = () => {
//   if (receiverId && text) {
//     // Send message through socket
//     socket.emit("send_private_messages", { userId, receiverId, text });
   
//     // Append new message instead of overwriting
//     setChat([...chat,{ text, sender: userId }]);

//     //using db to store the details so that chat can be saved-api call
//      const insertText=async()=>{
  


//     const myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");

//     const raw = JSON.stringify({
//       "chat_id": chatId,
//       "sender_id": userId,
//       "receiver_id": receiverId,
//       "content": text
//     });

//     const requestOptions = {
//        method: "POST",
//        headers: myHeaders,
//         body: raw,
//        redirect: "follow"
//     };

//     fetch("http://localhost:3001/text", requestOptions)
//       .then((response) => response.text())
//       .then((result) => console.log(result))
//       .catch((error) => console.error(error));

//      }
//     // Clear input field after sending
//     insertText();
//     setText("");
  
//     }};

//   return (
//     <div className="chat-container">
//       <button onClick={registerUser}>Register</button>
//       <div className="chat-box">
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             className={`message ${msg.sender_id === userId ? 'sent' : 'received'}`}
//           >
//             <p>{msg.content}</p>
//           </div>
//         ))}
//       </div>
      
//    {/* Display all messages */}
//    <div className="chat-box">
//         {chat.map((msg, index) => (
//          <div className={`message ${msg.sender==userId?'sent':'received'}`} key={index}>
//             <p>{msg.text}</p>
//           </div>
//         ))}
//       </div>
//       <div className="input-box">
//         <input type="text" placeholder="Type a message..."  onChange={(e) => setText(e.target.value)} />
//         <button onClick={sendMessages}>Send</button>
//       </div>

   
//     </div>
//   );
// };

// export default ChatProfile;


import React, { useState, useEffect, useCallback } from 'react';
import '../../ChatProfile.css'; // Keep your existing CSS file
import io from "socket.io-client";

const socket = io.connect("http://localhost:3001");

const ChatProfile = ({ userId, receiverId, theme = 'purple' }) => {
  const [messages, setMessages] = useState([]);
  const [chat, setChat] = useState([]); // Store real-time chat messages
  const [text, setText] = useState(''); // Store input text
  const [chatId, setChatId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available themes with their color schemes - matches Homepage component
  const themes = {
    purple: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-100',
      hover: 'hover:bg-purple-700',
      text: 'text-purple-600',
      light: 'bg-purple-50',
      focus: 'focus:ring-purple-500',
      sentBg: 'bg-purple-600',
      receivedBg: 'bg-gray-200'
    },
    teal: {
      primary: 'bg-teal-500',
      secondary: 'bg-teal-100',
      hover: 'hover:bg-teal-600',
      text: 'text-teal-600',
      light: 'bg-teal-50',
      focus: 'focus:ring-teal-500',
      sentBg: 'bg-teal-500',
      receivedBg: 'bg-gray-200'
    },
    orange: {
      primary: 'bg-orange-500',
      secondary: 'bg-orange-100',
      hover: 'hover:bg-orange-600',
      text: 'text-orange-600',
      light: 'bg-orange-50',
      focus: 'focus:ring-orange-500',
      sentBg: 'bg-orange-500',
      receivedBg: 'bg-gray-200'
    }
  };

  const currentTheme = themes[theme] || themes.purple;

  // Register user with socket
  const registerUser = useCallback(() => {
    if (userId) {
      socket.emit("register", userId);
    }
  }, [userId]);

  // Fetch message history from API
  const fetchMessages = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/homepage/chatprofile?userId=${userId}&receiverId=${receiverId}`
      );
      const data = await response.json();
      if (response.ok) {
        setMessages(data);
        console.log(data);
        // if (data && data.length > 0) {
        //   setChatId(data[0].chat_id);
        // }
        setError(null);
      } else {
        console.error("Error fetching messages:", data.error);
        setError("Could not load messages. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  }, [userId, receiverId]);

  // Fetch messages when user or receiver changes
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  // Socket event listeners
  useEffect(() => {
    console.log("Checking socket connection:", socket.connected);

    // const handleMessage = (data) => {
    //   console.log("Received message:", data.text);
    //   setChat((prevChat) => [...prevChat, { text: data.text, sender: data.userId, receiver:receiverId }]);
    // };

    const handleMessage = (data) => {
      console.log("Received message:", data);
    
      // Use actual sender and receiver from the message payload
      setChat((prevChat) => [
        ...prevChat,
        {
          text: data.text,
          sender: data.userId,           // sender of the message
          receiver: data.receiverId,     // actual receiver
        }
      ]);
    };
    

    socket.on("connect", () => {
      console.log("Socket connected with ID:", socket.id);
    });

    socket.on("receive_private_message", handleMessage);

    return () => {
      socket.off("receive_private_message", handleMessage);
    };
  }, []);

  // Send a message
  const sendMessages = () => {
    if (!receiverId || !text || text.trim() === '') return;

    // Send message through socket
    socket.emit("send_private_messages", { userId, receiverId, text });
    console.log("for knowing nonosnejjd"+userId+receiverId)

    // Append new message locally
    setChat([...chat, { text, sender: userId , receiver:receiverId}]);

    // Store message in database
    const insertText = async () => {
      try {
        const rQ = {
          method: "GET",
          redirect: "follow"
        };
    
        console.log(userId, receiverId);
    
        // Fetch chat ID first
        const response = await fetch(`http://localhost:3001/chatId?userId=${userId}&receiverId=${receiverId}`, rQ);
        const result = await response.json();  // Parse the response as JSON
        
        console.log(result);
        
        const temp = result[0]?.id;  // Safely access the chat ID if it exists
        if (!temp) {
          console.error("Chat ID not found.");
          return;  // Stop the function if no chat ID was found
        }
    
        // Now that temp is set, proceed with the next part
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const raw = JSON.stringify({
          "chat_id": temp,
          "sender_id": userId,
          "receiver_id": receiverId,
          "content": text
        });
    
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };
    
        const sendMessageResponse = await fetch("http://localhost:3001/text", requestOptions);
        const sendMessageResult = await sendMessageResponse.text();
        console.log(sendMessageResult);
    
      } catch (error) {
        console.error("Error saving message:", error);
      }
    };
    

    // Clear input field after sending
    insertText();
    setText("");
  };

  // Handle enter key press in input field
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessages();
    }
  };

  // // Create a combined message list with both historical and real-time messages
  // const allMessages = [...messages, ...chat.filter(msg => 
  //   !messages.some(m => m.content === msg.text && m.sender_id === msg.sender && m.receiver === msg.receiver)
  // )];


  const allMessages = [
    ...messages,
    ...chat.filter(msg =>
      !messages.some(m =>
        m.content === msg.text &&
        m.sender_id === msg.sender &&
        m.receiver_id === msg.receiver
      )
    )
  ].filter(
    (msg) =>
      (msg.sender_id === userId && msg.receiver_id === receiverId) ||
      (msg.sender_id === receiverId && msg.receiver_id === userId) ||
      (msg.sender === userId && msg.receiver === receiverId) ||
      (msg.sender === receiverId && msg.receiver === userId)
  );
  
  console.log("All Messages:", JSON.stringify(allMessages, null, 2));


  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
        <button 
          onClick={registerUser}
          className={`${currentTheme.primary} text-white px-3 py-1 rounded-md text-sm ${currentTheme.hover} transition-colors`}
        >
          Register
        </button>
      </div>

      {/* Messages container
      <div className="flex-1 overflow-y-auto mb-4 px-2 custom-scrollbar">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className={`animate-pulse w-10 h-10 rounded-full ${currentTheme.primary}`}></div>
          </div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : allMessages.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p>No messages yet. Start a conversation!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {allMessages.map((msg, index) => {
              const isSent = (msg.sender_id === userId) || (msg.sender === userId);
              return (
                <div
                  key={index}
                  className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${
                      isSent 
                        ? `${currentTheme.sentBg} text-white` 
                        : `${currentTheme.receivedBg} text-gray-800`
                    } shadow-sm`}
                  >
                    <p className="break-words">{msg.content || msg.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div> */}



<div className="flex-1 overflow-y-auto mb-4 px-2 custom-scrollbar">
  {isLoading ? (
    <div className="flex justify-center items-center h-full">
      <div className={`animate-pulse w-10 h-10 rounded-full ${currentTheme.primary}`}></div>
    </div>
  ) : error ? (
    <div className="text-center py-4 text-red-500">{error}</div>
  ) : allMessages.length === 0 ? (
    <div className="text-center py-10 text-gray-500">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
      <p>No messages yet. Start a conversation!</p>
    </div>
  ) : (
    <div className="space-y-2">
      {allMessages.map((msg, index) => {
        const isSent = msg.sender_id === userId || msg.sender === userId;
        return (
          <div key={index} className={`flex ${isSent ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-xs md:max-w-sm rounded-lg px-4 py-2 ${
                isSent
                  ? `${currentTheme.sentBg} text-white`
                  : `${currentTheme.receivedBg} text-gray-800`
              } shadow-sm`}
            >
              <p className="break-words">{msg.content || msg.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  )}
</div>

      {/* Message input */}
      <div className="mt-auto">
        <div className="flex rounded-lg border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-opacity-50 focus-within:border-transparent focus-within:shadow-sm">
          <input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 px-4 py-3 focus:outline-none"
          />
          <button
            onClick={sendMessages}
            disabled={!text?.trim()}
            className={`${currentTheme.primary} text-white px-6 ${
              text?.trim() ? currentTheme.hover : 'opacity-50 cursor-not-allowed'
            } transition-colors flex items-center justify-center`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatProfile;