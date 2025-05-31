import { useState } from "react";

function Signin() {
    const [id, setid] = useState("");
    const [pw, setpw] = useState("");

    const signin = async () => {
        const res = await fetch("http://localhost:5001/signin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, pw }),
        });
        alert(await res.text());
    };

    return (
        <div>
            <h2>회원가입</h2>
            <input type="text" placeholder="아이디" onChange={e => setid(e.target.value)} />
            <input type="password" placeholder="비밀번호" onChange={e => setpw(e.target.value)} />
            <button onClick={signin}>회원가입</button>
        </div>
    );
}

export default Signin;