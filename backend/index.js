const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const {Server} = require("socket.io");
const http = require('http');
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB 연결 성공'))
    .catch(err => console.error( err));

//소켓 연결 
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:"*"
    }
})
io.on("connection", (socket)=>{
    console.log('Connected to Server');
    socket.on("chat",(data)=>{
        io.emit("chat",data);
    })
    socket.on('disconnect',()=>{
        console.log('Disconnected');
    })
})

const Users = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    pw: {
        type: String,
        required: true
    }
});

const userdata = mongoose.model('userdata',Users);
module.exports = userdata;

//회원가입 기능 
app.post("/signin", async (req, res) => {
    try {
        const { id, pw } = req.body;

        const jungbok = await userdata.findOne({ id });
        if (jungbok) {
            return res.status(400).json({ message: "아이디가 이미 존재합니다." });
        }

        const signin = new userdata({ id, pw });
        await signin.save();

        res.status(201).json({ message: "회원가입에 성공하였습니다" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" });
    }
});

//로그인 기능 
app.post("/login", async (req, res) => {
    try {
        const { id, pw } = req.body;

        const user = await userdata.findOne({ id, pw }); 
        if (!user) {
            return res.status(400).json({ message: "아이디 또는 비밀번호가 올바르지 않습니다." });
        }

        const token = jwt.sign({ id: user.id},"bimil");

        res.status(200).json({ message: "로그인 성공!", token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "서버 오류 발생" }); 
    }
});


server.listen(5001,()=>{
    console.log("listening to port 5001");
})