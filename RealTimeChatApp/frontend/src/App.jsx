import React from 'react'
import socketIO from 'socket.io-client';
import {BrowserRouter as Router , Routes, Route} from "react-router-dom"
import Join from './component/join/join';
import Chat from './component/chat/chat';

const ENDPOINT = 'http://localhost:4500/'

const socket = socketIO(ENDPOINT,{transports:['websocket']});

const App = () => {

  socket.on("connect",()=>{
    
  })

  return (
    <div className='App'>
    <Router>
      <Routes>
        <Route path='/' element={<Join/>}>

        </Route>
<Route path="/chat" element={<Chat/>} ></Route>
      </Routes>
    </Router>
    </div>
  )
}

export default App