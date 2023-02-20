const express = require("express");
require("dotenv").config();
const cors = require("cors") 

const {connection} = require("./db.js")
const {userrouter} = require("./controller/users.route.js");
const {postsrouter} = require("./controller/posts.route.js");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users",userrouter);
app.use("/posts",postsrouter);

app.get("/",(req,res)=>{
    res.send("HOME PAGE");
})

app.listen(process.env.port,async ()=>{
    try{
        await connection;
        console.log({"msg":"Server connected to Mongo DB"});
    }catch(error){
        console.log({"msg":error});
    }
})