import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Signin() {
    const [id, setid] = useState("");
    const [pw, setpw] = useState("");
    const nav = useNavigate();
    const signin = async () => {
        const res = await fetch("http://localhost:5001/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, pw }),
        });
        const data = await res.json();
        if (res.status == 201) {
            alert("회원가입 되었습니다.");
            nav("/login"); 
        } else if (res.status == 400){
            alert("이미 존재하는 아이디입니다.")
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
            <input type="text" placeholder="아이디" onChange={e => setid(e.target.value)} />
            <input type="password" placeholder="비밀번호" onChange={e => setpw(e.target.value)} />
            <button onClick={signin}>회원가입</button>
        </div>
    );
}

export default Signin;