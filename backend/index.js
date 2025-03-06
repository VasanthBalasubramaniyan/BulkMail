const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const app = express();
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb+srv://vasanthniet123:123@cluster0.aqryx.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0")
  .then(function () {
    console.log("connected to db");
  })
  .catch(function () {
    console.log("Failed");
  });

const credential = mongoose.model("credential", {}, "bulkmail");

app.post("/sendmail", function (req, res) {
  var msg = req.body.msg;
  var emailList = req.body.emailList;
  console.log(msg);

  credential
    .find()
    .then(function (data) {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: data[0].toJSON().user,
          pass: data[0].toJSON().pass,
        },
      });
      new Promise(async function (resolve, reject) {
        try {
          for (var i = 0; i < emailList.length; i++) {
            await transporter.sendMail(
              {
                from: "vasanthniet123@gmail.com",
                to: emailList[i],
                subject: "A message from Bulk Mail App",
                text: msg,
              },
              function (error, info) {
                if (error) {
                  console.log(error);
                  res.send(false);
                } else {
                  console.log(info);
                  res.send(true);
                }
              }
            );
          }
          resolve("Success");
        } catch (error) {
          reject("Failed");
        }
      })
        .then(function () {
          res.send(true);
        })
        .catch(function () {
          res.send(false);
        });
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(5000, function () {
  console.log("Server started");
});