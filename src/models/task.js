const mongoose=require("mongoose");
const validator=require("validator");

const taskSchema=new mongoose.Schema({
    description:{
        type:String,
        requried:true,
        trim:true
    },
    complete:{
        default:false,
        type:Boolean
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true,
        ref:"User"
    }
},{
    timestamps:true
});

taskSchema.pre("save",async function(next){
    const task=this;
    console.log("before saving task");
    next();
});

const task=mongoose.model("task",taskSchema);

module.exports=task;