const http = require('http');
const express = require('express')
const cors = require("cors");
const socketIO = require("socket.io");
const PORT = 4500 || process.env.PORT;

const users = [{}]

const app = express();
const server = http.createServer(app);

const io = socketIO(server);

app.get("/",(req,res)=>{
    res.json({
        success : true
,message : "work"
    })    
})

app.use(cors({
    origin : "http://localhost:5175",
    credentials : true
}));

io.on("connection" , (socket) => {
  
socket.on('joined',({user})=>{
    users[socket.id] = user;
console.log(`${user} has joined`);

// when new user join left him send all to this message
socket.brodcast.emit(`userJoined`, {
    user: 'Admin',
    message : `${users[socket.id]} has joined`
  })
  
  socket.emit(`welcome` , {
      user : "Admin" , message : 'welcome to chat'
  })
})

socket.on(`message` , ({message,id}) =>{
io.emit(`sendMessage`,{user:users[id],message,id} )
})

socket.on(`disconnected`,()=>{

    socket.brodcast.emit('leave',{user :  "Admin" , message : "user had left"})
    console.log(`user left`);    
} )


})

server.listen(PORT,()=>{
    console.log(`${PORT} listen`);
})

