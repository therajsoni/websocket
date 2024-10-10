const express = require("express");
const {Server} = require("socket.io");
const http = require("http");
const server = http.createServer(express());
const io = new Server(server,{
    cors : {
        origin : "",
        methods : ["GET","POST"]
    }
})
// when new user come as previous but when disconnected then call as newUser
io.on('connection',(client)=>{
client.on('message',(message)=>{
//listen for message from client    
io.emit('message',message);    
})                    
client.on('disconnect',()=>{
    console.log('disconnected user');
})
})

