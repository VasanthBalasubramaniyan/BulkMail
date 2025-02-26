const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())

// Install Nodemailer
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "vasanthniet123@gmail.com",
    pass: "cjpw gdfx pxtj abjo",
  },
});



app.post("/sendmail",function(req,res){

    var msg = req.body.msg
    console.log(msg)

    transporter.sendMail(
        {
            from: "vasanthniet123@gmail.com",
            to: "vasanth02.msg@gmail.com",
            subject:"A message from Bulk Mail App",
            text: msg
        },
        function(error,info){
            if (error) {
                console.log(error)
                res.send(false)
            } else {
                console.log(info)
                res.send(true)
            }
        }
    )
})


app.listen(5000,function(){
    console.log("Server started")
})