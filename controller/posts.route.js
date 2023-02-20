const express = require("express");
const mongoose =  require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {PostsModel} = require("../models/posts.model.js");
const {authenticator} = require("../middlewares/authenticate.js");

const postsrouter = express.Router();
postsrouter.use(authenticator);
postsrouter.use(express.json());

postsrouter.get("/",async (req,res)=>{
    try {
        if(req.query.device){
            let posts = await PostsModel.find({device:req.query.device});
            res.send(posts);
        }else if(req.query.device1 && req.query.device2){
            let dev1 = await PostsModel.find({device:req.query.device1});
            let dev2 = await PostsModel.find({device:req.query.device2});
            let posts = [...dev1,...dev2];
            res.send(posts);
        }
        else{
            let ID = req.body.userID;
            let posts = await PostsModel.find({userID:ID});
            res.send(posts);
        }
    } catch (error) {
        res.send({"msg":error.message});
    }
})

postsrouter.get("/top",async (req,res)=>{
    try {
        let ID = req.body.userID;
        let posts = await PostsModel.find({userID:ID}).sort({no_of_comments:-1});
        res.send(posts[0]);
    } catch (error) {
        res.send({"msg":error.message});
    }
})

postsrouter.post("/create",async (req,res)=>{
    try {
        let payload = req.body;
        let posts = new PostsModel(payload);
        await posts.save();
        res.send({"msg":"Post has been created"});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

postsrouter.patch("/update/:id",async (req,res)=>{
    try {
        let ID = req.params.id;
        let payload = req.body;
        await PostsModel.findByIdAndUpdate({_id:ID},payload);
        res.send({"msg":"Post has been updated"});
    } catch (error) {
        res.send({"msg":error.message});
    }
})

postsrouter.delete("/delete/:id",async (req,res)=>{
    try {
        let ID = req.params.id;
        await PostsModel.findByIdAndDelete({_id:ID});
        res.send({"msg":"Post has been deleted"});
    } catch (error) {
        res.send({"msg":error.message});
    }
})


module.exports = {postsrouter};