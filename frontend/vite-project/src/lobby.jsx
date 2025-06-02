import { useState,useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'
import io from "socket.io-client"
import {jwtDecode} from "jwt-decode";


const socket = io("http://localhost:5001");
const token = localStorage.getItem("token");
let Id = null;

function Lobby() {
  
  
    if (token) {
      const decoded = jwtDecode(token); 
      Id = decoded.id;
    }
  // useState 변수 사용하는 자리 ex) const [count, setCount] = useState(0)
  const [chat,setChat] = useState([]);
  const [user,setUser] = useState(Id);
  const [input,setInput] = useState("");
  useEffect(()=>{
    socket.on("chat",(message)=>{
      setChat((prevChat) => [...prevChat,message]);
    });
    return () => {
      socket.off("chat");
    };
  },[]);
  const sendChat = () => {
    if(input.trim()) {
      socket.emit("chat",{user,message: input});
      setInput("");
    }
  };

  return (
    <>
    <br></br>
    <div className='chat-log'>
      {chat.map((msg,index)=>(
        <p key={index}>
          <strong>{msg.user}</strong>: {msg.message}
        </p>
      ))}
    </div>
    <div className='chat-input'>
      <input type='text'value={input} onChange={(e)=>setInput(e.target.value)}></input>
      <button onClick={sendChat}>전송</button>
    </div>
    </>
  );
}

export default Lobby;