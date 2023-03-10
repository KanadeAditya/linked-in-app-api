const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req,res,next) => {
    let token = req.headers.authorization;
    if(token){
        jwt.verify(token, process.env.secretkey , (err, decoded)=>{
           if(err){
                res.send({"msg":"Something went wrong","error":err});
           }else{
                req.body.userID = decoded.userID;
                next();
           }
        });
    }else{
        res.send({"msg":"Please Login First",token:false});
    }
}

module.exports = {authenticator}