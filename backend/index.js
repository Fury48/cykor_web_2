const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(5001,()=>{
    console.log("listening to port 5001");
})

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('DB 연결 성공'))
    .catch(err => console.error( err));

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

userdata.find().then(users => {
    console.log( users);
}).catch(error => {
    console.error( error);
});
