import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

function Login() {
    const [id, setid] = useState("");
    const [pw, setpw] = useState("");
    const nav = useNavigate();

    const login = async () => {
        const res = await fetch("http://localhost:5001/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, pw }),
        });

        const data = await res.json();
        if (res.status == 200) {
            localStorage.setItem("token", data.token);
            alert("로그인 되었습니다.");
            nav("/"); 
        } else {
            alert(data.message);
        }
    };

    return (
        <div>
            <input type="text" placeholder="아이디" onChange={e => setid(e.target.value)} />
            <input type="password" placeholder="비밀번호" onChange={e => setpw(e.target.value)} />
            <button onClick={login}>로그인</button>
        </div>
    );
}

export default Login;