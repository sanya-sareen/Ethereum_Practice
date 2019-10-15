'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

// //Collection created under mydb
// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
// //name of the database is mydb
//     var dbo = db.db("mydb");
// //name of the collection is admin_credentials
//     dbo.createCollection("admin_credentials", function(err, res) {
//       if (err) throw err;
//       console.log("Collection created!");
//       db.close();
//     });
//   }); 
//-------------------------------------------------------------------------
//Insert admin's username and password

//   MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     var myobj = { username: "admin", password: "admin" };
//     //var myobj = { username: req.body.name, password: req.body.address };
//     //var myobj = req.body;
//     console.log(myobj);
//     dbo.collection("admin_credentials").insertOne(myobj, function (err, res) {
//       if (err) throw err;
//       console.log("1 document inserted");
//       db.close();

//     });
//   });
//Check the username and password of admin matches with entered credentials
app.post('/check', function (req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        var query = { username: req.body.username, password: req.body.password };
        dbo.collection("admin_credentials").find(query).toArray(function (err, result) {
            if (err) throw err;
            console.log(result);
            db.close();
        });
    });
 res.send("data inserted");
});
//-------------------------------------------------------------
//Send OTP to the admin for verification

const SendOtp = require('sendotp');
//Initialize with your MSG91 auth key
const sendOtp = new SendOtp('291338AGKeVlgnre5q5d64bb65');
sendOtp.setOtpExpiry('5'); //in minutes

app.post('/sendOTP', function (req, res) {
    var collectData;
    sendOtp.send(req.body.phone, "OTPSMS", function (error, data) {
        collectData = data;
        console.log(data);
        res.send(data.type);
    });
});
app.post('/verifyOTP', function (req, res) {
    sendOtp.verify(req.body.phone, req.body.otp, function (error, data) {
        console.log(data); // data object with keys 'message' and 'type'
        if (data.type == 'success') {
            console.log('OTP verified successfully')
            res.send("success");
        }
        if (data.type == 'error') {
            console.log('OTP verification failed')
            res.send("failed");
        }
    });
});
app.post('/retryOTP', function (req, res) {
    sendOtp.retry(req.body.phone, false, function (error, data) {
        console.log(data);
        res.send(data.message);
    });
})
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})