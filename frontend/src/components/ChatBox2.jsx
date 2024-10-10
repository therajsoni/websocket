import React, { useEffect, useState } from 'react'
import {useDispatch,useSelector} from "@reduxjs/toolkit";
import Message from './Message';
import { addMessage } from '../redux/chatSlice/chatSlice';
import io from 'socket.io-client';

const ChatBox2 = () => {

const [input,setInput] = useState('')
const dispatch = useDispatch();
const msgs = useSelector((state) => state.messages);

// socket io connections
const socket = io('http://localhost:8000');

useEffect(()=>{
// 1 step --> listen for incoming newMsg from server
 socket.on('message' , (newMsg) => {
dispatch(addMessage(newMsg));
})
return () => {
// 2. clear socket connection when component unMount
socket.disconnect();
// socket.close();
}
},[dispatch,socket]);

const sendMsg = () => {
if(input?.trim()){
const msg = {
content : input,
timeStamp : new Date(),
}

// 3. send msg to server
socket.emit("message", msg);
setInput('');
}
}

return (
    <div>

    </div>
  )
}

export default ChatBox2