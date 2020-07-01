const {MongoClient,ObjectID}=require("mongodb");

const connectionURL="mongodb://127.0.0.1:27017";
const databaseName="task-manager";

const id=new ObjectID();
console.log(id.id);
MongoClient.connect(connectionURL,{useNewUrlParser:true},(error,client)=>{
    if(error){
        return console.log("unable to connect to database");
    }
    //console.log("connect correctly");
    const db=client.db(databaseName);
    /*db.collection("users").insertOne({
        _id:id,
        name:"allen",
        age:28
    },(error,result)=>{
        if(error){
            return console.log("unable to insert");
        }
        console.log(result.ops);
    })*/
    /*db.collection("users").insertMany([
        {
            name:"jane",
            age:27
        },
        {
            name:"Emliy",
            age:28
        }
    ],(error,result)=>{
        if(error){
            return console.log("unable to connect database");
        }
        console.log(result.ops);
    })*/
    /*db.collection("tasks").insertMany([
        {
            descirption:"description 1",
            completed:false
        },
        {
            descirption:"description 2",
            completed:true
        },{
            descirption:"descirption 3",
            completed:false
        }
    ],(error,result)=>{
        if(error){
            return console.log("cannot connect to the database");
        }
        console.log(result.ops);
    })*/
    /*db.collection("users").findOne({_id:new ObjectID("5ee62e931cf0e02c641ae8b4")},(error,user)=>{
        if(error)
        {
            return console.log("unable to fetch");
        }
        console.log(user);
    })*/
    /*db.collection("users").find({age:28}).count((error,count)=>{
        console.log(count);
    })*/
    /*db.collection("tasks").findOne({_id:new ObjectID("5ee6338e2d810d70fc907fd1")},(error,task)=>{
        console.log(task);
    })
    db.collection("tasks").find({completed:false}).toArray((error,result)=>{
        console.log(result);
    })*/
    /*const UpdatePromise = db.collection("users").updateOne({
        _id:new ObjectID("5ee53d8cdbe9eb688466ca9f"),
    },{
        $inc:{
            age:1
        }
    })
    UpdatePromise.then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })*/
    /*const UpdatePromiseAll=db.collection("tasks").updateMany({
        completed:false,
    },{
        $set:{
            completed:true
        }
    })
    UpdatePromiseAll.then((result)=>{
        console.log(result)
    }).catch((error)=>{
        console.log(error);
    })*/
    const deletemany=db.collection("tasks").deleteMany({
        description:"description 1"
    });
    deletemany.then((result)=>{
        console.log(result);
    }).catch((error)=>{
        console.log(error);
    })
});