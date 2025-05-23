let users={}

const handleSocketConnections=(socket,io)=>{
    socket.on("register", async (userId) => {
        console.log(`Registering user: ${userId} with socket ID: ${socket.id}`);
    
        users[userId]=socket.id;
    
        
      });
    
    
      //sending and receiving texts
      socket.on("send_private_messages", async({ userId, receiverId,text }) => {
        console.log(`Sent from user ${userId}`);
     
     console.log("Active sockets:", [...io.sockets.sockets.keys()]);
    
        // const rcvSocketId=data[0].socket_id;
        const rcvSocketId=users[receiverId];
        console.log("The dominators"+users[userId],users[receiverId])
        
        if(rcvSocketId){
          console.log(`CHECK Does socket ${rcvSocketId} exist?`, io.sockets.sockets.has(rcvSocketId));
         io.to(rcvSocketId).emit("receive_private_message",{userId,text,receiverId});
          console.log(`Message from ${userId} to ${rcvSocketId}: ${text}`);
        } else {
          console.log(`User ${rcvSocketId} is not connected.`);
        }
    
       
      });
    
}

module.exports=handleSocketConnections;