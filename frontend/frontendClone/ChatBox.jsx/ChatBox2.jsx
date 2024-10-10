import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/chatSlice/chatSlice';
import MessageBox from './MessageBox';
import io from 'socket.io-client'

const ChatBox2 = () => {

    const [input,setInput] = useState('');
    const dispatch = useDispatch();
    const msgs = useSelector((state) => state.messages) 
    let socket;

    useEffect(()=>{
    io('http://localhost:8080')//backend url
    
    socket.on("message" , (msg) => {
    return dispatch(addMessage(input))
    })
   
    
    return () => {
        socket.close();
        // socket.disconnect()
    }
    },[dispatch])

    const sendMsg = () => {
    if(input?.trim()){
        const newMsg = {
            content : input,
            timeStamp : new Date(),
        }
        
        socket.emit("message",(newMsg))

    }
    setInput('')    
    }
  

  return (
    <div>ChatBox2</div>
  )
}

export default ChatBox2