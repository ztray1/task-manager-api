const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
const { deleteMany } = require("./task");
const task=require("./task");
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:Number,
        trim:true,
        default:0,
        validate(value){
            if(value<0){
                throw new Error("age must be a positive number");
            }
        }
    },
    email:{
        unique:true,
        trim:true,
        type:String,
        requried:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("it is a not a validate email");
            }
        }
    },
    password:{
        trim:true,
        type:String,
        required:true,
        minlength:7,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('Password cannot contain "password"');
            }
        }
    },
    tokens:[{
        token:{
            type:String,
            required:true,
        }
    }],
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
});

userSchema.virtual("tasks",{
   ref:"task",
   localField:"_id",
   foreignField:"owner"

})

userSchema.methods.toJSON=function(){
    const user=this;
    const userObject=user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    return userObject;
}

userSchema.pre("remove",async function(next){
    const user=this;
    await task.deleteMany({owner:user._id});
    next();
})


userSchema.methods.generateAuthtoken=async function(){
    const user=this;
    const token=jwt.sign({_id:user._id.toString()},process.env.JWT_SECRET);
    //console.log(token);
    user.tokens=user.tokens.concat({token});
    //console.log(user.tokens);
    await user.save();
    return token;
}


userSchema.statics.findByCredentials= async(email,password)=>{
    const user=await User.findOne({email});
    if(!user){
        throw new Error("unable to loginin");
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new Error("password is not match");
    }
    return user;
}


userSchema.pre('save',async function(next){
    const user=this;
    //console.log("just before saving");
    if(user.isModified("password")){
        user.password=await bcrypt.hash(user.password,8);
    }
    next();
})

const User = mongoose.model("User",userSchema);

module.exports=User;