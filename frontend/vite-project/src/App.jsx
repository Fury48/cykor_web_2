import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import './App.css'
// import Login from "./login";
import Signin from "./signin";

function App() {
  // useState 변수 사용하는 자리 ex) const [count, setCount] = useState(0)

  return (
    <>
    <h1>CHAT</h1>
    <div className='chat-log'>
    </div><br></br>
    <Router>
      <div>
        {/* <Link to="/login">로그인</Link> */}
        <Link to="/signin">회원가입</Link>
        <Routes>
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </Router>
    <div className='chat-input'>
      <input type='text'></input>
      <button>전송</button>
    </div>
    </>
  )
}

export default App
