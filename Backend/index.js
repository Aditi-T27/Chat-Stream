const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const app = express();
const path=require('path')
require('dotenv').config();


//All Routes Import
const chats= require('./routes/chats');
const identity=require('./routes/identity')
const chatProfile=require('./routes/chatprofile');
const text=require('./routes/text');
const qrCode=require('./routes/qrcode')
const signUp=require('./routes/signUp')
const sendReq=require('./routes/sendReq')
const reqAccess=require('./routes/requestAccess')
const acceptReq=require('./routes/acceptrequest')
const chatId=require('./routes/chatId')

//creating a server
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});
const handleSocketConnections=require('./sockets/messageHandlers')


//calling middlewares
app.use(cors());
app.use(express.json());
app.use('/api/chats',chats)
app.use('/api/homepage/chatprofile',chatProfile)
app.use('/text',text)
app.use('/qrcode',qrCode)
app.use('/signup',signUp)
app.use('/req',sendReq)
app.use('/identity',identity)//unused
app.use('/reqAccess',reqAccess)
app.use('/acceptReq',acceptReq)
app.use('/chatId',chatId)
app.use(express.static(path.join(__dirname, 'public')));

// Socket.io Logic
io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id} `);
  handleSocketConnections(socket,io);
});

server.listen(3001, () => console.log("Server running on port 3001"));
