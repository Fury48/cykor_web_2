import { useState } from 'react'
import './App.css'

function App() {
  // useState 변수 사용하는 자리 ex) const [count, setCount] = useState(0)

  return (
    <>
    <h1>CHAT</h1>
    <div className='chat-log'>
    </div><br></br>
    <div className='chat-input'>
      <input type='text'></input>
      <button>전송</button>
    </div>
    </>
  )
}

export default App
