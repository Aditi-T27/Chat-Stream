// import React, { useEffect, useState } from 'react';
// import ChatProfile from './ChatProfile';
// import { io } from "socket.io-client";
// import Connect from './Connect';
// const socket = io("http://localhost:3001");
// import { useNavigate } from "react-router-dom";
// import QrScanner from './QrScanner';
// const Homepage = ({ token }) => {

//   const navigate = useNavigate();
//   const [chatUsers, setChatUsers] = useState([]);
//   const [showChat, setShowChat] = useState(false);

//   // Extract userId from token safely
//   const userId = token?.user?.id;
//   if (!userId) {
//     console.error("User ID not found!");
//     return <p>Loading...</p>;
//   }

//   const handleAccountClick = () => {
//     setShowChat(true);
//   };

//   useEffect(() => {
//     socket.connect();
//     socket.emit("registerUser", userId);

//     return () => {
//       socket.disconnect();
//     };
//   }, [userId]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch(`http://localhost:3001/api/chats?userId=${userId}`);
//         const data = await response.json();
//         setChatUsers(data);
//       } catch (error) {
//         console.error("Error fetching chats:", error);
//       }
//     };

//     fetchUsers();
//   }, [userId]);
//   const [isConnected, setIsConnected] = useState(false);  // State to control visibility

//   // Handle the click to toggle the rendering of the Connect component
//   const handleClick = () => {
//     setIsConnected(!isConnected);
//   };

//   return (
//     <div>

// <button onClick={handleClick}>Click to Connect</button>

// {/* Render Connect component conditionally */}
// {isConnected && <Connect userId={userId}/>}


//       <h2>Your Chats</h2>
//       {chatUsers.length === 0 ? (
//         <p>No Chats</p>
//       ) : (
//         chatUsers.map(user => (
//           <div key={user.id} className="chat-box">
//             <button onClick={handleAccountClick}>{user.name}</button>
//             {showChat && <ChatProfile userId={userId} receiverId={user.id} />}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default Homepage;

import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import ChatProfile from './Components/ChatProfile';
// import Connect from '../Connect';
import QrScanner from './Components/QrScanner';
import GetQRCode from './Components/GetQRCode';
import RequestModal from './Components/RequestModal';
// Socket initialization
const socket = io("http://localhost:3001");

const Homepage = ({ token }) => {
  const navigate = useNavigate();
  const [chatUsers, setChatUsers] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [isConnectVisible, setIsConnectVisible] = useState(false);
  const [theme, setTheme] = useState('purple'); // Default theme
  const [qr,setQR]=useState(false);
  const[identity,setIdentity]=useState("user");//unused
  const[senderidentity,setSenderIdentity]=useState("user");//unused
  const [showModal, setShowModal] = useState(false);
  const [requests, setRequests] = useState([]);

  // Available themes with their color schemes
  const themes = {
    purple: {
      primary: 'bg-purple-600',
      secondary: 'bg-purple-100',
      hover: 'hover:bg-purple-700',
      text: 'text-purple-600',
      textLight: 'text-purple-100',
      borderColor: 'border-purple-300',
      gradientFrom: 'from-purple-600',
      gradientTo: 'to-indigo-800'
    },
    teal: {
      primary: 'bg-teal-500',
      secondary: 'bg-teal-100',
      hover: 'hover:bg-teal-600',
      text: 'text-teal-500',
      textLight: 'text-teal-100',
      borderColor: 'border-teal-300',
      gradientFrom: 'from-teal-500',
      gradientTo: 'to-emerald-600'
    },
    orange: {
      primary: 'bg-orange-500',
      secondary: 'bg-orange-100',
      hover: 'hover:bg-orange-600',
      text: 'text-orange-500',
      textLight: 'text-orange-100',
      borderColor: 'border-orange-300',
      gradientFrom: 'from-orange-500',
      gradientTo: 'to-pink-600'
    }
  };

  const currentTheme = themes[theme];

  // Extract userId from token safely
  const userId = token?.user?.id;
  const fullName = token?.user?.user_metadata?.fullname;
  
  console.log("Full Name:", fullName);
  
  // Handle loading state when user ID is not available
  if (!userId) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <div className={`animate-pulse h-16 w-16 mx-auto rounded-full ${currentTheme.primary} bg-opacity-80`}></div>
          <p className="mt-4 font-medium text-gray-700">Initializing connection...</p>
        </div>
      </div>
    );
  }

  // Connect to socket on component mount
  useEffect(() => {
    socket.connect();
    socket.emit("registerUser", userId);
    
    return () => {
      socket.disconnect();
    };
  }, [userId]);

  // Fetch chat users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/chats?userId=${userId}`);
        const data = await response.json();
        console.log("sdvsdvfeffedgdfg"+data[0].id)
        setChatUsers(data);
      } catch (error) {
        console.error("Error fetching chats:", error);
      }
    };



 
    fetchUsers();
    
  }, [userId]);

  const handleChatClick = (chatUserId) => {
    setSelectedUserId(chatUserId);
    setShowChat(true);
  };

  const handleConnectToggle = () => {
    setIsConnectVisible(!isConnectVisible);
  };

  const switchTheme = () => {
    const themeKeys = Object.keys(themes);
    const currentIndex = themeKeys.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeKeys.length;
    setTheme(themeKeys[nextIndex]);
  };

  const handleQRClick=()=>{
    setQR(true);
  }

  const handleViewRequest = async () => {
    try {
      const res = await fetch(`http://localhost:3001/reqAccess?user_id=${userId}`);
      const data = await res.json();
   
      if(data.status==="NoData"){
        setShowModal(true);
        return;
      }
      
      const val = data[0].sender_id;
   
  
      const response = await fetch(`http://localhost:3001/identity?user_id=${val}`);
      const content = await response.json();
      
      setIdentity(content); // This will trigger useEffect if set
  
      setRequests(data);
      setShowModal(true);
    } catch (err) {
      console.error("Failed to fetch requests:", err);
    }
  };
  useEffect(() => {
    if (identity) {
      console.log("Updated identity:", identity[0].name);
    }
  }, [identity]);
    


  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className={`w-full bg-gradient-to-r ${currentTheme.gradientFrom} ${currentTheme.gradientTo} text-white shadow-md`}>
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold tracking-tight">PULSE<span className="opacity-80">CHAT</span></h1>
          </div>
          
          <div className="flex items-center space-x-4">

            <button className="rounded-md p-2 font-bold" style={{backgroundColor:`${theme}`}} onClick={handleQRClick}>Generate QRCode</button>
            {qr && <GetQRCode userId={userId}  onClose={() => setQR(false)}/>}
            <button 
              onClick={switchTheme} 
              className="p-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition-all"
              title="Switch theme"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
              </svg>
            </button>
            
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full ${currentTheme.primary} flex items-center justify-center text-white font-bold ml-1`}>
                {fullName.charAt(0).toUpperCase() || 'U'}
              </div>
              {/* <div className="ml-2 hidden md:block">
                <p className="font-medium text-sm">{fullName || user}</p>
              </div> */}

    <details className="ml-2 relative hidden md:block group">
      <summary className="cursor-pointer font-medium text-sm">
        {fullName || user}
      </summary>
        <ul className="absolute mt-1 w-40 bg-white border border-gray-300 rounded shadow-md text-sm text-gray-800 z-10">
        <button
        className="px-4 py-2 hover:bg-gray-100 cursor-pointer rounded shadow"
        onClick={handleViewRequest}
      >
        View Requests
      </button>

      {showModal && (
        <RequestModal requests={requests} identity={identity[0].name} onClose={() => setShowModal(false)} />
      )}
        {/* Add more dropdown items if needed */}
        </ul>
    </details>

            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left panel - chat list */}
        <div className="w-full md:w-72 lg:w-80 bg-white shadow-md flex flex-col">
          {/* Connect button */}
          <div className="p-3">
            <button 
              onClick={handleConnectToggle}
              className={`w-full ${currentTheme.primary} ${currentTheme.hover} font-medium py-2 px-4 rounded-lg flex items-center justify-center transition-all shadow-md`}
            >
              {isConnectVisible ? 'Hide Connect' : 'Connect with New Friends'}
              <span className={`ml-2 ${isConnectVisible ? 'rotate-45' : ''} transform transition-transform`}>+</span>
            </button>
          </div>
          
          {/* Connect panel */}
          {isConnectVisible && (
           <div className="max-w-md mx-auto mb-6 p-6 bg-white rounded-2xl border shadow-lg animate-fadeIn">
           {/* <Connect userId={userId} /> */}
           <QrScanner userId={userId}/>
         </div>
         
          )}

          {/* Chat users list */}
          <div className="flex-1 overflow-y-auto custom-scrollbar">
            <div className="px-3 py-2">
              <h2 className="text-lg font-medium mb-2 flex items-center text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${currentTheme.text} mr-2`} viewBox="0 0 20 20" fill="currentColor">
                  <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z" />
                  <path d="M15 7v2a4 4 0 01-4 4H9.828l-1.766 1.767c.28.149.599.233.938.233h2l3 3v-3h2a2 2 0 002-2V9a2 2 0 00-2-2h-1z" />
                </svg>
                Your Chats
              </h2>
            </div>
            
            {chatUsers.length === 0 ? (
              <div className="text-center py-6 px-3">
                <div className={`w-16 h-16 mx-auto rounded-full ${currentTheme.primary} bg-opacity-30 flex items-center justify-center`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <p className="mt-4 text-gray-500 text-sm">No active connections yet.</p>
                <p className="text-xs text-gray-400 mt-1">Use the connect button to find people</p>
              </div>
            ) : (
              <div className="px-2">
                <ul className="space-y-1">
                  {chatUsers.map(user => (
                    <li key={user.id}>
                      <button 
                        onClick={() => handleChatClick(user.id)}
                        className={`w-full text-left transition-all rounded-lg p-3 flex items-center 
                          ${selectedUserId === user.id 
                            ? `${currentTheme.secondary} ${currentTheme.text}` 
                            : 'hover:bg-gray-100 text-gray-800'}`}
                      >
                        <div className={`w-10 h-10 rounded-full ${selectedUserId === user.id ? 'bg-white' : currentTheme.primary} flex items-center justify-center ${selectedUserId === user.id ? currentTheme.text : 'text-white'} font-bold mr-3`}>
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="font-medium">{user.name}</h3>
                          <p className="text-xs text-gray-500">Tap to open chat</p>
                        </div>
                        <div className="ml-auto">
                          <div className={`w-2 h-2 rounded-full ${currentTheme.primary}`}></div>
                        </div>
                      </button>
                    
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        
        {/* Right panel - for chat content (left empty for your implementation) */}
        

<div className="hidden md:block flex-1 bg-gray-50">
  {showChat ? (
    <ChatProfile userId={userId} receiverId={selectedUserId} theme={theme} />
  ) : (
    <div className="h-full flex flex-col items-center justify-center text-gray-500">
      <div className={`w-20 h-20 ${currentTheme.primary} rounded-full flex items-center justify-center mb-4 opacity-30`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </div>
      <p className="text-xl font-medium">Select a chat to begin</p>
      <p className="text-sm mt-2">Your conversations will appear here</p>
    </div>
  )}
</div>

      </div>
    </div>
  );
};

// Add some global styles
const style = document.createElement('style');
style.textContent = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 4px;
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.03);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.2);
  }
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fadeIn {
    animation: fadeIn 0.3s ease-out forwards;
  }
`;
document.head.appendChild(style);

export default Homepage;