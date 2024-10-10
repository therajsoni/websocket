import React, { useState } from 'react'
import './join.css'
import logo from './whatsapp.jpg'
import { Link } from 'react-router-dom'

let user;

const senduser = () => {
    user = document.getElementById('JoinInput').value;
    document.getElementById('JoinInput').value = ""  
}

const Join = () => {

const [name,setName] = useState(""); 

    return (
    <div className='JoinPage'>
    <div className="JoinContainer">
        <img src={logo} alt="logo"/>
        <h1>JOIN PAGE</h1>
        <input type='text' onChange={(e)=>setName(e.target.value)} placeholder='name' id='JoinInput' />
        <Link onClick={(e) => !name ? e.preventDefault() : null} to="/chat">
        <button onClick={senduser} className='Joinbtn'>Login In</button>
        </Link>
    </div>
    </div>
  )
}

export default Join
export {user}