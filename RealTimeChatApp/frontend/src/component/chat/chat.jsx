import React, { useEffect, useState } from 'react'
import {user} from '../join/join'
import socketIO from 'socket.io-client'
import './chat.css';
import  sendImg from './sendImg.jpg'
import Message from '../Message/Message';
import ReactScrollToBottom from 'react-scroll-to-bottom'

const ENDPOINT = 'http://localhost:4500/'

let socket;

const Chat = () => {

  const [id,setId] = useState("")

  const  [messages,setMessages] = useState([])

  const send = () => {



    const message = document.getElementById('chatInput').value();
    socket.emit(`message`,{message:message,id});
    document.getElementById('chatInput').value() = "";
  }
  
  useEffect(()=>{

    socket = socketIO(ENDPOINT,{transports : ['websocket']})
    
    socket.on('connect',()=>{
      // alert('connected');
      setId(socket.id)
    })

    socket.emit('joined', {user:user})
    
    socket.on(`welcome`,(data) => {
      console.log(data?.user , data?.message);      
    })

   socket.on(`userJoined`,(data)=>{
    console.log(data?.user , data?.message);    
   })

   socket.on(`leave` , (data) => {
    console.log(data.user , data.message);
    
   })

    return () => {
      socket.emit('disconnect');
      socket.off()
    }
  },[])


  useEffect(()=>{
    socket.on(`sendMessage`,(data)=>{
      console.log(data.user,data.message,data.id);      
    })
    return () => {

    }
  },[input])

  return (
    <div className='chatPage'>
<div className='chatContainer'>
  <div className='header'></div>
  <ReactScrollToBottom className='chatBox'>
    {
      messages.map((item,index)=>{
return <Message message={item} key={index} />
      })
    }
<Message/>
  </ReactScrollToBottom>
  <div className='inputBox' >
    <input type='text' id='chatInput'/>
    <button onClick={send} className='sendBtn' >
      <img src={sendImg} alt='sendImg' />
    Send
    </button>
  </div>
</div>
    </div>
  )
}

export default Chat