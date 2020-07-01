const express=require("express");
require("./db/mongoose");
const User=require("./models/user");
const task=require("./models/task");
const userRouter=require("./routers/user");
const taskRouter=require("./routers/task");
const { findById } = require("./models/user");

const app=express();
const port=process.env.Port;

/*app.use((req,res,next)=>{
    //console.log("site is under maintenance");
    res.status(503).send("site is under maintenance");
    next();
})*/

app.use(express.json());
app.use(userRouter);
app.use(taskRouter);

app.listen(port,()=>{
    console.log("the server is on port "+port);
})


const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");

const myfunction=async()=>{
    const token=jwt.sign({_id:"abc123"},"this is my new work",{expiresIn:"7 days"});
    //console.log(token);
    const data=jwt.verify(token,"this is my new work");
    //console.log(data);
}

myfunction();
/*

const myfunction=async()=>{
    const password="45678940";
    const hashedpassoword=await bcrypt.hash(password,8)
    console.log(password);
    console.log(hashedpassoword);
    const ismatch=await bcrypt.compare("45678940",hashedpassoword)
    console.log(ismatch);
}

myfunction();*/

/*const Task=require("./models/task");


const main=async() =>{
    /*const task=await Task.findById("5ef4a9ce5d27f3e36b3fe168");
    await task.populate("owner").execPopulate();
    console.log(task.owner);*/
   /* const user =await User.findById("5ef626ca2a8592a144c36b35");
    await user.populate("tasks").execPopulate();
    console.log(user.tasks);
}
main();*/

const multer=require("multer");
const upload=multer({
    dest:"images",
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docx)$/)){
            return cb(new Error("file must be word"))
        }
        cb(undefined,true);
    }
})


app.post("/upload",upload.single('upload'), (req,res)=>{
    res.send();
},(error,req,res,next)=>{
    res.status(400).send({error:error.message});
})