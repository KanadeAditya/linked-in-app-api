// title ==> String
// body ==> String
// device ==> String
// no_of_comments ==> Number

const mongoose =  require("mongoose");

const postsSchema = mongoose.Schema({
    title : {type:String,required:true},
    body : {type:String,required:true},
    device : {type:String,required:true},
    no_of_comments : {type:Number,required:true},
    userID: {type:String,required:true}
})

const PostsModel = mongoose.model("post",postsSchema);

module.exports = {PostsModel} ; 