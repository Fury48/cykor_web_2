const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// app.listen(5001,()=>{
//     console.log("");
// })

const app = express();
app.use(express.json());
app.use(cors());

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