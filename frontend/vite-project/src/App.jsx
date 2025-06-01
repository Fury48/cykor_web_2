import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'
import {jwtDecode} from "jwt-decode";
import { Buffer } from "buffer";

import Login from './login';
import Signin from "./signin";
import Lobby  from './lobby';

function App() {
  // useState 변수 사용하는 자리 ex) const [count, setCount] = useState(0)
  const token = localStorage.getItem("token");

  if (token) {
    const decoded = jwtDecode(token); 
    console.log(decoded.id);
  }

  return (
    <>
    <Router>
      <h1>CHAT</h1>
      <div>
        <Link to="/lobby"> 로비 </Link>
        <Link to="/login"> 로그인 </Link>
        <Link to="/signin"> 회원가입 </Link>
      </div>
      <Routes>
        <Route path="/" element={<Lobby />} />
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </Router>
    </>
  );
}

export default App;
