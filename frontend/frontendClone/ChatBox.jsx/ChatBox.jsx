import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../redux/chatSlice/chatSlice';
import MessageBox from './MessageBox';

const ChatBox = () => {
  
    const [input,setInput] = useState('');
    const dispatch = useDispatch();
    const msgs = useSelector((state) => state.messages) 
    let socket;

    useEffect(()=>{
    socket = WebSocket('http://localhost:8080')//backend url
    socket.onmouse((event) => addMessage(JSON.parse(event.data)));
    
    return () => {
        socket.close();
    }
    },[dispatch])

    const sendMsg = () => {
    if(input?.trim()){
        const newMsg = {
            content : input,
            timeStamp : new Date(),
        }
    socket.send((newMsg)=>{
        return JSON.stringify(newMsg)
    });    
    }
    setInput('')    
    }

    return (
    <>
    {
    msgs?.map((message,index)=>{
        return (
            <MessageBox key={key} content = {message} timeStamp={new Date().toLocaleTimeString()} /> 
        )
    })
    }
    <input
    value={input}
    placeholder='message..'
    onChange={sendMsg}
    name='msg'
    />
    <button>
     SendMsg    
    </button>
    </>
  )
}

export default ChatBox