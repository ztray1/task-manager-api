const sgmail=require("@sendgrid/mail")
//const sendgridAPIkey="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";
sgmail.setApiKey(process.env.SENDGRID_API_KEY);
/*sgmail.send({
    to:"zhangtuo332@gmail.com",
    from:"zhangtuo332@gmail.com",
    subject:"this is my first creation",
    text:"I hope this one actually get from to you"
}).then(()=>{
    console.log("message sent");
}).catch((error)=>{
    console.log(error.response.body);
})*/

const sendWelcomeEmail =(email,name)=>{
    sgmail.send({
        to:email,
        from:"zhangtuo332@gmail.com",
        subject:"Thanks for joining in",
        text:`welcome to the app ${name}`
    }).then(()=>{
        console.log("message sent");
    }).catch((error)=>{
        console.log(error);
    })
}

const sendCancelEmail=(email,name)=>{
    sgmail.send({
        to:email,
        from:"zhangtuo332@gmail.com",
        subject:"Sorry to see you go",
        text:`Goodbye ${name}, I hope to see you sometime soon`
    })
}

module.exports={
    sendWelcomeEmail,
    sendCancelEmail
}