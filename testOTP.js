'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const SendOtp = require('sendotp');
const sendOtp = new SendOtp('291338AGKeVlgnre5q5d64bb65');//using the API key

//                 TESTED ALL METHODS

sendOtp.setOtpExpiry('5'); //in minutes
sendOtp.send("9713765392", "OTPSMS",function (error, data) {
    console.log(data);    
  });

//   sendOtp.verify("9713765392", "4703", function (error, data) {
//     console.log(data); // data object with keys 'message' and 'type'
//     if(data.type == 'success') console.log('OTP verified successfully')
//     if(data.type == 'error') console.log('OTP verification failed')
//   });

//   sendOtp.retry("9713765392", false, function (error, data) {
//     console.log(data);
//   });

