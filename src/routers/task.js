const express=require("express");

const router=new express.Router();

const task=require("../models/task");

const auth =require("../middleware/auth");
const { request } = require("express");

router.get("/tasks",auth, async(req,res)=>{
    const match={};
    const sort={};
    if(req.query.complete){
        match.complete=req.query.complete==="true";
    }
    if(req.query.sortBy){
        const parts=req.query.sortBy.split(":");
        sort[parts[0]]=parts[1]==="desc"?-1:1;
    }
    try{
        await req.user.populate({
            path:"tasks",
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        }).execPopulate();
        //const Task=await task.find({owner:req.user._id});
        res.send(req.user.tasks);
    }catch(e){
        res.status(500).send(e);
    }
})

router.get("/tasks/:id", auth, async(req,res)=>{
    const _id=req.params.id;
    
    try{
        const Task=await task.findOne({_id,owner:req.user._id});
        if(!Task){
            res.send(404).send();
        }
        res.send(Task);
    }catch(e){
        res.status(500).send();
    }
})


router.post("/tasks", auth, async(req,res)=>{
    const Task=new task({
        ...req.body,
        owner:req.user._id
    });
    try{
        await Task.save();
        res.status(201).send(Task);
    }catch(e){
        res.status(500).send(e);
    }
})


router.patch("/tasks/:id",auth, async(req,res)=>{
    const updates=Object.keys(req.body);
    console.log(updates);
    const allowedupdates=['complete','description'];
    const isupdatevalid=updates.every((updateitem)=>allowedupdates.includes(updateitem));
    if(!isupdatevalid){
        return res.status(400).send({"error":"not found"});
    }
    try{
        //const Task=await task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true});
        const Task=await task.findOne({_id:req.params.id,owner:req.user._id});
        //const Task=await task.findById(req.params.id);
        //console.log(Task);
        //console.log(req.body);
        updates.forEach(udpate => {
            Task[udpate]=req.body[udpate];
        });
        await Task.save();
        if(!Task){
            res.status(404).send();
        }
        res.status(200).send(Task)
    }catch(e){
        res.status(500).send(e);
    }

})


router.delete("/tasks/:id",auth, async(req,res)=>{
    try{
        const Task=await task.findOneAndDelete({_id:req.params.id,owner:req.user._id});
        if(!Task){
            return res.status(404).send({"error":"not found"});
        }
        res.status(200).send(Task);
    }catch(e){
        res.status(500).send(e);
        console.log(e);
    }
})

module.exports=router;