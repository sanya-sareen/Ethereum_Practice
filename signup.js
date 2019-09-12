'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var MongoClient = require('mongodb').MongoClient;
app.use(cors());
app.use(bodyParser.json());
var passwordHash = require('password-hash');

app.post('/createAccount', async function (req, response) {
    var url = "mongodb://localhost:27017/";

    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var myobj = { firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: passwordHash.generate(req.body.password) };
        //var myobj = req.body;
        //console.log(myobj);
        dbo.collection("signupDetails").insertOne(myobj, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            console.log(res);
            db.close();
            response.send(JSON.stringify("account created"));
            //response.send(JSON.stringify(res));
        });
    });

})
// OTP GENERATION
app.post('/generateOTP', async function (req, response) {
    const SendOtp = require('sendotp');
    const sendOtp = new SendOtp('291338AGKeVlgnre5q5d64bb65');//using the API key
    var myobjOTP = req.body.phone;
    sendOtp.setOtpExpiry('5'); //in minutes
    await sendOtp.send(myobjOTP, "OTPSMS", function (error, data) {
        console.log(data);
    });
    response.send(JSON.stringify("OTP sent"));
})
// RESEND OTP
app.post('/resendOTP', async function (req, response) {
    const SendOtp = require('sendotp');
    const sendOtp = new SendOtp('291338AGKeVlgnre5q5d64bb65');//using the API key
    var myobjOTP = req.body.phone;
    sendOtp.setOtpExpiry('5'); //in minutes
    await sendOtp.retry("myobjOTP", false, function (error, data) {
        console.log(data);
    });
    response.send(JSON.stringify("OTP sent"));
})
// VERIFY OTP
// app.post('/verifyOTP', async function (req, response) {
//     const SendOtp = require('sendotp');
//     const sendOtp = new SendOtp('291338AGKeVlgnre5q5d64bb65');//using the API key
//     var myobjOTP = req.body.phone;
//     sendOtp.setOtpExpiry('5'); //in minutes
//     await sendOtp.verify(myobjOTP, "4703", function (error, data) {
//         console.log(data); // data object with keys 'message' and 'type'
//         if(data.type == 'success') console.log('OTP verified successfully')
//         if(data.type == 'error') console.log('OTP verification failed')
//       });

//     response.send(JSON.stringify("Verified"));
// })

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
