import { useEffect,useState } from "react";
import { UseDispatch , useDispatch, useSelector } from "react-redux";
import { addMessage } from "../redux/chatSlice/chatSlice";
import Message from './Message.jsx';

export default function ChatBox(){   
    const [input,setInput] = useState('')
    const dispatch = useDispatch();
    const messages = useSelector((state) => state.chat.messages);
    let socket;

    useEffect(()=>{
                // 1. connected to WebSocket with server/backend
        socket = new WebSocket('http://localhost:8000')   // backend port server
        // 2.socket msg -- when trigger that server give newMsg
        socket.onmessage = (event) => {
            const newMsg = JSON.parse(event.data);
            dispatch(addMessage(newMsg));
        }
        return () => {
            socket.close();
        }
    },[dispatch]);

    const sendMsg = () => {
        if(input?.trim()){
         const msg = {
            content : input , 
            timeStamp : new Date(),
         }  
        }
        socket.send(JSON.stringify(msg));
        setInput('')
    }

    return (
        <div>

<div className="chat-box">
{
    messages?.map((msg,index) => (
        <Message key={index}
        content={content}
        timesStamp={timeStamp}
        >
        </Message>
    ))
}
<input
type="text"
value={input}
onChange={(e) => {
    e.preventDefault();
    return setInput(e.target.value)
}}
placeholder="messages..."
/>
<button
onClick={sendMsg}
>
Send
</button>

</div>
</div>
    )
}